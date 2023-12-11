import { Injectable, NotFoundException } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { returnBookObjectWithAuthor } from '../book/return.book.object'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import type { CreateShelfDto, UpdateShelfDto } from './dto/shelf.dto'
import { returnShelfObject } from './return.shelf.object'

@Injectable()
export class ShelfService {
	constructor(private readonly prisma: PrismaService) {}
	async byId(shelfId: number, selectObject: Prisma.ShelfSelect = {}) {
		const shelf = await this.prisma.shelf.findUnique({
			where: {
				id: +shelfId
			},
			select: {
				...returnShelfObject,
				...selectObject
			}
		})
		if (!shelf)
			throw new NotFoundException(`Shelf ${ErrorsEnum.Not_Found}`).getResponse()
		return shelf
	}

	async infoById(shelfId: number) {
		const shelf = await this.prisma.shelf.findUnique({
			where: {
				id: +shelfId
			},
			select: {
				...returnShelfObject,
				description: true,
				_count: {
					select: {
						books: true,
						watched: true
					}
				},
				books: {
					select: {
						...returnBookObjectWithAuthor,
						pages: true
					}
				}
			}
		})

		if (!shelf)
			throw new NotFoundException(`Shelf ${ErrorsEnum.Not_Found}`).getResponse()
		const { _count, ...rest } = shelf
		return {
			...rest,
			statistics: {
				Books: _count.books,
				Watched: _count.watched
			}
		}
	}

	async catalog(userId: number) {
		const likedShelves = await this.prisma.shelf.findMany({
			select: returnShelfObject,
			where: {
				watched: {
					some: {
						id: userId
					}
				}
			}
		})
		const otherShelves = await this.prisma.shelf.findMany({
			take: 10,
			select: returnShelfObject,
			orderBy: {
				watched: {
					_count: 'desc'
				}
			},
			where: {
				watched: {
					none: {
						id: userId
					}
				},
				hidden: {
					none: {
						id: userId
					}
				}
			}
		})

		return [...likedShelves, ...otherShelves]
	}

	async all(searchTerm: string) {
		return this.prisma.shelf.findMany({
			take: 20,
			select: returnShelfObject,
			...(searchTerm && {
				where: {
					title: {
						contains: searchTerm
					}
				}
			})
		})
	}

	async create(dto: CreateShelfDto) {
		const shelfExists = await this.prisma.shelf.findUnique({
			where: {
				title: dto.title
			}
		})
		if (shelfExists)
			throw new NotFoundException(
				`Shelf ${ErrorsEnum.Already_Exist}`
			).getResponse()
		return this.prisma.shelf.create({
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
		return this.prisma.shelf.delete({
			where: {
				id: +id
			}
		})
	}

	async update(id: number, dto: UpdateShelfDto) {
		await this.byId(+id)
		const booksExists = await this.prisma.book.findMany({
			where: {
				id: {
					in: dto.books
				}
			}
		})
		if (booksExists.length !== dto.books.length)
			throw new NotFoundException(
				`Some books ${ErrorsEnum.Not_Found}`
			).getResponse()

		return this.prisma.shelf.update({
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
