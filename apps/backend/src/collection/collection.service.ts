import { HttpStatus, Injectable } from '@nestjs/common'
import { Activities, type Prisma } from '@prisma/client'
import { ActivityService } from '../activity/activity.service'
import { returnBookObject } from '../book/return.book.object'
import { serverError } from '../utils/call-error'
import { AdminErrors } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import type {
	CreateCollectionDto,
	UpdateCollectionDto
} from './dto/collection.dto'
import { returnCollectionObject } from './return.collection.object'

@Injectable()
export class CollectionService {
	//TODO: сделать по нормальному колекции
	constructor(
		private readonly prisma: PrismaService,
		private readonly activityService: ActivityService
	) {}
	async byId(id: number, selectObject: Prisma.CollectionSelect = {}) {
		const collection = await this.prisma.collection.findUnique({
			where: {
				id: +id
			},
			select: {
				...returnCollectionObject,
				...selectObject
			}
		})
		if (!collection)
			throw serverError(HttpStatus.BAD_REQUEST, AdminErrors.collectionNotFound)
		return collection
	}

	async infoById(id: number, userId: number) {
		const collection = await this.prisma.collection.findUnique({
			where: {
				id: +id
			},
			select: {
				...returnCollectionObject,
				description: true,
				_count: {
					select: {
						books: true
					}
				},
				books: {
					select: {
						...returnBookObject,
						pages: true
					}
				}
			}
		})

		if (!collection)
			throw serverError(HttpStatus.BAD_REQUEST, AdminErrors.collectionNotFound)

		await this.activityService.create({
			type: Activities.visitCollection,
			importance: 1,
			userId,
			collectionId: id
		})

		const { _count, ...rest } = collection
		return {
			...rest,
			statistics: {
				Books: _count.books
			}
		}
	}

	all(searchTerm: string) {
		return this.prisma.collection.findMany({
			take: 20,
			select: returnCollectionObject,
			...(searchTerm && {
				where: {
					title: {
						contains: searchTerm
					}
				}
			})
		})
	}

	async create(dto: CreateCollectionDto) {
		const collectionExists = await this.prisma.collection.findUnique({
			where: {
				title: dto.title
			}
		})
		if (collectionExists)
			throw serverError(
				HttpStatus.BAD_REQUEST,
				AdminErrors.collectionAlreadyExist
			)
		return this.prisma.collection.create({
			data: {
				title: dto.title,
				picture: dto.picture,
				books: {
					connect: dto.books.map(bookId => ({ id: bookId }))
				}
			}
		})
	}

	async delete(id: number) {
		await this.byId(+id)
		return this.prisma.collection.delete({
			where: {
				id: +id
			}
		})
	}

	async update(id: number, dto: UpdateCollectionDto) {
		await this.byId(+id)
		const booksExists = await this.prisma.book.findMany({
			where: {
				id: {
					in: dto.books
				}
			}
		})
		if (booksExists.length !== dto.books.length)
			throw serverError(HttpStatus.BAD_REQUEST, AdminErrors.someBooksNotFound)

		return this.prisma.collection.update({
			where: {
				id: +id
			},
			data: {
				title: dto.title,
				picture: dto.picture,
				books: {
					set: dto.books.map(bookId => ({ id: bookId }))
				}
			}
		})
	}
}
