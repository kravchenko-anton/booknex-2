import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { plainToClassFromExist } from 'class-transformer'
import { validate } from 'class-validator'
import { getFileUrl } from '../../../../../libs/global/api-config'
import { globalErrors } from '../../../../../libs/global/errors'
import { getServerBookHtml } from '../../../../../libs/global/helpers/getBookHtml'
import { serverError } from '../../utils/helpers/call-error'
import { ActivityService } from '../../utils/services/activity/activity.service'
import { PrismaService } from '../../utils/services/prisma.service'
import { PayloadEBook, type StoredEBook } from './ebook.model'

@Injectable()
export class EbookService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService
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
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.unknownError)
		}
		const errors = await validate(plainToClassFromExist(PayloadEBook, ebook))
		if (errors.length > 0) {
			throw serverError(HttpStatus.BAD_REQUEST, globalErrors.somethingWrong)
		}
		return ebook
	}

	async ebookBySlug(slug: string, userId: number) {
		const book = await this.prisma.book.findUnique({
			where: { slug, visible: true },
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
					link: `#${name + ' ' + title}`
				}))
			}))
		}
	}
}
