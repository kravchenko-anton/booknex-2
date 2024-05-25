import { ActivityService } from '@/src/activity/activity.service'
import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities } from '@prisma/client'
import { getFileUrl } from 'global/api-config'
import { globalErrors } from 'global/errors'
import { getServerBookHtml } from 'global/helpers/getBookHtml'
import { slugify } from 'global/helpers/slugify'
import { StoredEBookSchema } from 'global/validation/ebook/ebook.schema'
import { z } from 'zod'
import { serverError } from '../../utils/helpers/server-error'
import { PrismaService } from '../../utils/services/prisma.service'
import type { StoredEBook } from './ebook.dto'

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
					.map(({ text, name, romanNumber, readingTime, id }) =>
						getServerBookHtml({
							name,
							id,
							sectionId: `${slugify(name + ' ' + title)}_${id}`,
							text,
							readingTime,
							romanNumber
						})
					)
					.join(' ')
			),
			chapters: ebook.map(({ title, chapters }) => ({
				title,
				children: chapters.map(({ name, id }) => ({
					name,
					link: `${slugify(name + ' ' + title)}_${id}`
				}))
			}))
		}
	}
}
