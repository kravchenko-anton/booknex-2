import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { hash, verify } from 'argon2'
import { returnBookObjectWithAuthor } from '../book/return.book.object'
import { returnShelfObject } from '../shelf/return.shelf.object'
import { ErrorsEnum } from '../utils/errors'
import { PrismaService } from '../utils/prisma.service'
import type { UserUpdateBioDto, UserUpdatePasswordDto } from './dto/user.update.dto'
import { returnUserObject } from './return.user.object'
import type { UserLibraryCategoryType } from './user.types'
import {
	CatalogTitleType,
	DesignationType,
	idSelect,
	userLibraryFields,
	UserLibraryFieldsEnum,
	UserOppositeToggle
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
		if (!user) throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`).getResponse()
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
				watchedShelves: {
					select: returnShelfObject
				},
				hiddenShelves: {
					select: returnShelfObject
				}
			}
		})
		if (!library) throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`).getResponse()
		return {
			[UserLibraryFieldsEnum.readingBooks]: library.readingBooks,
			[UserLibraryFieldsEnum.finishedBooks]: library.finishedBooks,
			[UserLibraryFieldsEnum.watchedShelves]: library.watchedShelves,
			[UserLibraryFieldsEnum.hiddenShelves]: library.hiddenShelves,
		}
	}


	async profile(id: number) {
		const user = await this.getUserById(id, {
			...returnUserObject,
			picture: true
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
			totalPageCount: totalPageCount ?? 0,
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

	async updatePicture(userId: number, fileName: string) {
		await this.getUserById(userId, {
			picture: true
		})
		await this.prisma.user.update({
			where: { id: userId },
			data: {
				picture: fileName
			}
		})
		return this.getUserById(userId)
	}

	async updateBio(userId: number, dto: UserUpdateBioDto) {
		const isSameUser = await this.prisma.user.findUnique({
			where: { email: dto.email }
		})

		if (!isSameUser) throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`).getResponse()

		if (isSameUser && isSameUser.id !== userId)
			throw new BadRequestException(
				`User with this email ${ErrorsEnum.Already_Exist}`
			).getResponse()

		const user = await this.getUserById(userId, {
			password: false
		})
		await this.prisma.user.update({
			where: { id: userId },
			data: {
				email: dto.email ?? user.email,
				name: dto.name ?? user.name
			}
		})
		return this.getUserById(userId)
	}

	async all(searchTerm: string) {
		return this.prisma.user.findMany({
			take: 20,
			select: {
				...returnUserObject,
				_count: {
					select: {
						finishedBooks: true,
						readingBooks: true,
						watchedShelves: true,
						hiddenShelves: true
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
				watchedShelves: idSelect,
				hiddenShelves: idSelect
			}
		})
		if (!favoriteList)
			throw new NotFoundException(`User ${ErrorsEnum.Not_Found}`).getResponse()

		return {
			readingBooks: favoriteList.readingBooks.map(book => book.id),
			finishedBooks: favoriteList.finishedBooks.map(book => book.id),
			watchedShelves: favoriteList.watchedShelves.map(shelf => shelf.id),
			hiddenShelves: favoriteList.hiddenShelves.map(shelf => shelf.id)
		}
	}

	async toggle(userId: number, id: number, type: UserLibraryCategoryType) {
		if (!userLibraryFields.includes(type))
			throw new BadRequestException(ErrorsEnum.Invalid_Value).getResponse()
		const existBookOrShelf = await this.prisma[
			DesignationType[type] as 'book'
		].findFirst({
			where: { id },
			select: { id: true }
		})
		if (!existBookOrShelf)
			throw new NotFoundException(`${DesignationType[type]} ${ErrorsEnum.Not_Found}`).getResponse()

		const user = await this.getUserById(+userId, {
			readingBooks: idSelect,
			finishedBooks: idSelect,
			watchedShelves: idSelect,
			hiddenShelves: idSelect
		})

		const isExist = user[type].some(book => book.id === id)
		const isOppositeExist = user[UserOppositeToggle[type]].some(
			book => book.id === id
		)
		await this.prisma.user.update({
			where: { id: user.id },
			data: {
				[type]: {
					[isExist ? 'disconnect' : 'connect']: {
						id
					}
				},
				...(isOppositeExist && {
					[UserOppositeToggle[type]]: {
						disconnect: {
							id
						}
					}
				})
			}
		})
		return {
			message: `${DesignationType[type]} ${
				isExist ? 'removed from' : 'added to'
			} your ${CatalogTitleType[type].toLowerCase()} list`,
			isExist: !isExist
		}
	}
}
