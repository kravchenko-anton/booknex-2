import { ActivityService } from '@/src/activity/activity.service'
import { updatedContent } from '@/src/parser/helpers/unfold-ebook'
import { StorageService } from '@/src/storage/storage.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { getFileUrl } from 'global/api-config'
import { globalErrors } from 'global/errors'
import { getServerBookHtml } from 'global/helpers/getBookHtml'
import { slugify } from 'global/helpers/slugify'
import { z } from 'zod'
import { serverError } from '../../utils/helpers/server-error'
import { PrismaService } from '../../utils/services/prisma.service'
import { StoredEBookSchema, type StoredEBook } from './ebook.model'

@Injectable()
export class EbookService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService,
		private readonly storageService: StorageService
	) {}
	async storedEbook(slug: string) {
		const book = await this.prisma.book.findUnique({
			where: { slug },
			select: {
				id: true,
				ebook: true
			}
		})
		if (!book) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.unknownError)
		}
		const ebook: StoredEBook[] = await fetch(getFileUrl(book.ebook))
			.then(result => result.json())
			.catch(() => null)
		if (!ebook) {
			console.log('error', 'not found ebook' + slug)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.unknownError)
		}
		const errors = z.array(StoredEBookSchema).safeParse(ebook)
		if (!errors.success) {
			console.log('error', 'not valid ebook' + slug, errors.error)
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}

		return ebook
	}

	async fixEBookStructure() {
		const books = await this.prisma.book.findMany({
			select: {
				ebook: true,
				title: true,
				slug: true
			}
		})
		for (const book of books) {
			if (!book) {
				throw serverError(HttpStatus.BAD_REQUEST, globalErrors.unknownError)
			}
			console.log('link', getFileUrl(book.ebook))

			const ebook: StoredEBook[] = await fetch(getFileUrl(book.ebook))
				.then(result => result.json())
				.catch(() => null)

			if (!ebook) {
				console.log('error', 'not found ebook ' + book.slug)
				throw serverError(HttpStatus.BAD_REQUEST, globalErrors.unknownError)
			}

			const errors = z.array(StoredEBookSchema).safeParse(ebook)
			if (!errors.success) {
				throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
			}

			const newEbook: StoredEBook[] = []
			for (const { chapters, ...newChapter } of ebook) {
				const newChapters = []
				for (const { text, ...rest } of chapters) {
					const finalContent = await updatedContent(text)
					newChapters.push({
						...rest,
						text: finalContent
					})
				}
				newEbook.push({ ...newChapter, chapters: newChapters })
			}
			const { name: ebookName } = await this.storageService.upload({
				folder: 'ebooks',
				file: Buffer.from(JSON.stringify(newEbook)),
				fileName: `${book.title}.json`
			})
			await this.prisma.book.update({
				where: { slug: book.slug },
				data: {
					ebook: ebookName
				}
			})
		}
	}

	async ebookBySlug(slug: string, userId: number) {
		const book = await this.prisma.book.findUnique({
			where: { slug, isPublic: true },
			select: {
				id: true,
				title: true,
				ebook: true,
				picture: true
			}
		})
		if (!book) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.unknownError)
		}
		const ebook = await this.storedEbook(slug)
		await this.activityService.create({
			type: Activities.getEbook,
			importance: 2,
			userId,
			bookSlug: slug
		})

		return {
			...book,
			file: ebook.map(({ chapters, title }) =>
				chapters
					.map(({ text, name, romanNumber, readingTime }) =>
						getServerBookHtml({
							name,
							title,
							text,
							readingTime,
							romanNumber
						})
					)
					.join(' ')
			),
			chapters: ebook.map(({ title, chapters }) => ({
				title,
				children: chapters.map(({ name }) => ({
					name,
					link: `${slugify(name + ' ' + title)}`
				}))
			}))
		}
	}
}
