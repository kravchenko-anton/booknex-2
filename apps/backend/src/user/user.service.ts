import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { hash, verify } from 'argon2'
import { returnBookObjectWithAuthor } from '../book/return.book.object'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import type { UserUpdatePasswordDto } from './dto/user.update.dto'
import { returnUserObject } from './return.user.object'
import type { UserLibraryCategoryType } from './user.types'
import {
	CatalogTitleType,
	UserLibraryFieldsEnum,
	idSelect,
	userLibraryFields
} from './user.types'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUserById(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				...returnUserObject,
				...selectObject
			}
		})
		if (!user)
			throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`).getResponse()
		return user
	}

	async library(id: number) {
		const library = await this.prisma.user.findUnique({
			where: { id },
			select: {
				readingBooks: {
					select: returnBookObjectWithAuthor
				},
				finishedBooks: {
					select: returnBookObjectWithAuthor
				},
				savedBooks: {
					select: returnBookObjectWithAuthor
				}
			}
		})
		if (!library)
			throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`).getResponse()
		return {
			[UserLibraryFieldsEnum.readingBooks]: library.readingBooks,
			[UserLibraryFieldsEnum.finishedBooks]: library.finishedBooks,
			[UserLibraryFieldsEnum.savedBooks]: library.savedBooks
		}
	}

	async profile(id: number) {
		const user = await this.getUserById(id, {
			...returnUserObject
		})

		const {
			_count: { id: bookCount },
			_sum: { pages: totalPageCount }
		} = await this.prisma.book.aggregate({
			where: { finishedBy: { some: { id } } },
			_count: { id: true },
			_sum: { pages: true }
		})

		return {
			...user,
			bookCount: bookCount ?? 0,
			totalPageCount: totalPageCount ?? 0
		}
	}

	async updatePassword(userId: number, dto: UserUpdatePasswordDto) {
		const user = await this.getUserById(userId, {
			password: true
		})
		const isPasswordValid = await verify(user.password, dto.oldPassword)
		if (!isPasswordValid)
			throw new BadRequestException(ErrorsEnum.Invalid_Value).getResponse()
		await this.prisma.user.update({
			where: { id: userId },
			data: {
				password: await hash(dto.password)
			}
		})
	}

	async all(searchTerm: string) {
		return this.prisma.user.findMany({
			take: 20,
			select: {
				...returnUserObject,
				_count: {
					select: {
						finishedBooks: true,
						readingBooks: true
					}
				},
				...(searchTerm && {
					where: {
						title: {
							contains: searchTerm
						}
					}
				})
			}
		})
	}

	async delete(id: number) {
		const user = await this.getUserById(id)
		await this.prisma.user.delete({
			where: { id: user.id }
		})
	}

	async favoriteList(userId: number) {
		const favoriteList = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				readingBooks: idSelect,
				finishedBooks: idSelect,
				savedBooks: idSelect
			}
		})
		if (!favoriteList)
			throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`).getResponse()

		return {
			readingBooks: favoriteList.readingBooks.map(book => book.id),
			finishedBooks: favoriteList.finishedBooks.map(book => book.id),
			savedBooks: favoriteList.savedBooks.map(book => book.id)
		}
	}

	async toggle(userId: number, id: number, type: UserLibraryCategoryType) {
		if (!userLibraryFields.includes(type))
			throw new BadRequestException(ErrorsEnum.Invalid_Value).getResponse()
		const existBookOrShelf = await this.prisma.book.findFirst({
			where: { id },
			select: { id: true }
		})
		if (!existBookOrShelf)
			throw new NotFoundException(`book ${ErrorsEnum.Not_Found}`).getResponse()

		const user = await this.getUserById(+userId, {
			readingBooks: idSelect,
			finishedBooks: idSelect,
			savedBooks: idSelect
		})

		const isExist = user[type].some(book => book.id === id)

		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				[type]: {
					[isExist ? 'disconnect' : 'connect']: {
						id
					}
				}
			}
		})
		return {
			message: `book ${
				isExist ? 'removed from' : 'added to'
			} your ${CatalogTitleType[type].toLowerCase()} list`,
			isExist: !isExist
		}
	}
}
