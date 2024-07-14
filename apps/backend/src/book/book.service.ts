import { HttpStatus, Injectable } from '@nestjs/common'
import { globalErrors } from 'global/errors'
import { slugify } from 'global/helpers/slugify'
import { checkHtmlValid } from 'global/utils/html-validation'
import { StorageService } from '../storage/storage.service'
import { serverError } from '../utils/helpers/server-error'
import { PrismaService } from '../utils/services/prisma.service'
import type { Book, CreateBookDto, UpdateBookDto } from './book.dto'
import type { UpdateBookDtoExtended } from './book.types'

import {
	bookCatalogFields,
	bookCreateFields,
	infoBySlug,
	infoBySlugAdminFields
} from '@/src/book/book.fields'
import { returnBookObject } from '@/src/book/return.book.object'
import { statisticReduce } from '@/src/utils/services/statisticReduce.service'
import { useEbookCalculation } from './helpers/get-ebook'

@Injectable()
export class BookService {
	constructor(
		private readonly prisma: PrismaService,
		private storageService: StorageService
	) {}

	async infoBySlug(slug: string) {
		const book = await this.prisma.book.findUnique({
			where: { slug, isPublic: true },
			select: infoBySlug
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)

		return {
			...book,
			fromSameAuthor: await this.prisma.book.findMany({
				where: {
					isPublic: true,
					author: book.author,
					slug: {
						not: book.slug
					}
				},
				select: returnBookObject
			})
		}
	}

	async infoBySlugAdmin(slug: string) {
		const book = await this.prisma.book.findUnique({
			where: { slug },
			select: infoBySlugAdminFields(slug)
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		const { readingHistory = [], ...rest } = book

		return {
			...rest,
			statistics: statisticReduce({
				statistics: readingHistory.map(statistics => ({
					...statistics,
					pagesCount: book.pagesCount
				})),
				initialDate: book.createdAt,
				nowDate: true
			})
		}
	}

	async catalog(searchTerm: string, page: number) {
		const perPage = 20
		const count = await this.prisma.book.count()
		return {
			data: await this.prisma.book.findMany(
				bookCatalogFields({ page, perPage, searchTerm })
			),
			canLoadMore: page < Math.floor(count / perPage),
			totalPages: Math.floor(count / perPage)
		}
	}

	async create(dto: CreateBookDto) {
		const { genreIds, mainGenreSlug } = await this.getGenres(dto.genres)
		const { readingTime, uploadedEbook, pagesCount, chaptersCount } =
			useEbookCalculation(dto.ebook)

		const { isValid, messages } = await checkHtmlValid(
			uploadedEbook
				.map(book =>
					book.chapters.map(chapter => `${chapter.text}`.trim()).join('')
				)
				.join('')
		)
		console.log('isValid', isValid)
		if (!isValid) throw serverError(HttpStatus.BAD_REQUEST, messages)

		const { name: ebookName } = await this.storageService.upload({
			folder: 'ebooks',
			file: Buffer.from(JSON.stringify(uploadedEbook)),
			fileName: dto.title + '.json'
		})

		await this.prisma.book.create({
			data: bookCreateFields({
				dto,
				genreIds,
				mainGenreSlug,
				ebookName,
				readingTime,
				chaptersCount,
				pagesCount
			})
		})
	}

	async remove(slug: string) {
		//TODO: сделать так, чтобы при удалении книги удалялись все статистики по ней
		await this.prisma.book.delete({ where: { slug } })
	}

	async update(slug: string, dto: UpdateBookDto) {
		const book = await this.prisma.book.findUnique({
			where: { slug },
			select: {
				id: true,
				title: true,
				ebook: true
			}
		})
		if (!book)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		const { genres, title, ebook, ...rest } = dto

		let updateData: UpdateBookDtoExtended = { ...rest }

		if (ebook) {
			const { uploadedEbook, readingTime, pagesCount, chaptersCount } =
				useEbookCalculation(ebook)
			const { isValid, messages } = await checkHtmlValid(
				uploadedEbook
					.map(book =>
						book.chapters.map(chapter => `${chapter.text}`.trim()).join('')
					)
					.join('')
			)
			if (!isValid) throw serverError(HttpStatus.BAD_REQUEST, messages)

			const { name: ebookName } = await this.storageService.upload({
				folder: 'ebooks',
				file: Buffer.from(JSON.stringify(uploadedEbook)),
				fileName: `${book.title}.json`
			})

			updateData = {
				...updateData,
				ebook: ebookName,
				readingTime,
				pagesCount,
				chapters: chaptersCount
			}
		}

		if (genres) {
			const { genreIds, mainGenreSlug } = await this.getGenres(genres)
			updateData = {
				...updateData,
				genres: {
					set: genreIds
				},
				mainGenre: {
					connect: {
						slug: mainGenreSlug
					}
				}
			}
		}
		if (title) {
			updateData = {
				...updateData,
				slug: slugify(title)
			}
		}

		await this.prisma.book.update({
			where: { id: book.id },
			data: updateData
		})
	}

	async getGenres(genres: Book['genres']) {
		const mainGenre = await this.prisma.genre.findFirst({
			where: {
				slug: {
					in: genres.map(genre => genre.slug)
				}
			},
			select: {
				slug: true
			},
			orderBy: {
				mainBooks: {
					_count: 'asc'
				}
			}
		})
		if (genres.length < 2 || !mainGenre)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		return {
			mainGenreSlug: mainGenre.slug,
			genreIds: genres.map(({ slug }) => ({ slug }))
		}
	}
}
