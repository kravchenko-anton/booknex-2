import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common'
import { AdminErrors } from '../../../../libs/global/errors'
import { defaultReturnObject } from '../utils/common/return.default.object'
import { serverError } from '../utils/helpers/call-error'
import { PrismaService } from '../utils/services/prisma.service'
import type { ParserDto } from './dto/parser.dto'
import {
	parseBookTable,
	parseCurrentBook,
	useParser
} from './helpers/parse-ebook'
import { getEbook } from './helpers/unfold-ebook'

@Injectable()
export class ParserService {
	constructor(private readonly prisma: PrismaService) {}

	async adminCatalog(searchTerm: string, page: number) {
		throw new BadRequestException('Method not implemented.')
		const perPage = 20
		return {
			data: await this.prisma.bookTemplate.findMany({
				take: perPage,
				select: {
					...defaultReturnObject,
					title: true,
					rating: true,
					description: true,
					author: true,
					genres: true,
					picture: true
				},
				...(page && {
					skip: page * perPage
				}),
				...(searchTerm && {
					where: {
						OR: [
							{
								author: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							},
							{
								title: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							}
						]
					}
				})
			}),
			canLoadMore:
				page < Math.floor((await this.prisma.bookTemplate.count()) / perPage),
			totalPages: Math.floor((await this.prisma.bookTemplate.count()) / perPage)
		}
	}

	async remove(id: number) {
		return this.prisma.bookTemplate.delete({
			where: {
				id
			}
		})
	}

	async unfold(file: Express.Multer.File) {
		if (!file.buffer && file.mimetype !== 'application/epub+zip')
			throw serverError(HttpStatus.BAD_REQUEST, AdminErrors.invalidFile)
		return getEbook(file.buffer)
	}
	async byId(id: number) {
		return this.prisma.bookTemplate.findUnique({
			where: {
				id
			},
			select: {
				...defaultReturnObject,
				title: true,
				rating: true,
				description: true,
				author: true,
				picture: true,
				genres: true
			}
		})
	}
	async parse(dto: ParserDto) {
		try {
			const bookTemplate = await this.prisma.bookTemplate.findMany({
				select: {
					title: true
				}
			})
			const { browser, page } = await useParser()

			const books = await parseBookTable(page, dto.url, dto.page)
			for (const book of books) {
				try {
					const { title, author, description, picture, genres, rating } =
						await parseCurrentBook(page, book.link)
					if (bookTemplate.some(b => b.title === title.trim())) continue
					if (rating < 2) continue
					const goodGenres = await this.prisma.genre.findMany({
						where: {
							OR: genres.map(name => ({
								name: {
									contains: String(name),
									mode: 'insensitive'
								}
							}))
						}
					})
					await this.prisma.bookTemplate.create({
						data: {
							title: title.trim(),
							author: author.name,
							description,
							picture,
							rating,
							genres: {
								connect: goodGenres.map(genre => ({
									name: genre.name
								}))
							}
						}
					})
				} catch (error) {
					console.error(error)
				}
			}
			await page.close()
			await browser.close()
		} catch (error) {
			console.error(error)
		}
	}
}
