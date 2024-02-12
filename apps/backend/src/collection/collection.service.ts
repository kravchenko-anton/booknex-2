import { HttpStatus, Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { returnBookObject } from '../book/return.book.object'
import { ActivityEnum } from '../user/user.types'
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
	constructor(private readonly prisma: PrismaService) {}
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
			return serverError(HttpStatus.BAD_REQUEST, AdminErrors.collectionNotFound)
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
			return serverError(HttpStatus.BAD_REQUEST, AdminErrors.collectionNotFound)
		await this.prisma.activity.create({
			data: {
				type: ActivityEnum.Visit_Collection,
				importance: 1,
				user: {
					connect: {
						id
					}
				},
				collection: {
					connect: {
						id: userId
					}
				}
			}
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
			return serverError(
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
			return serverError(HttpStatus.BAD_REQUEST, AdminErrors.someBooksNotFound)

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
