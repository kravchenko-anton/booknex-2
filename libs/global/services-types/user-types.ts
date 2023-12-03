import type { Prisma } from '@prisma/client'
import type { returnBookObjectWithAuthor } from '../../../apps/backend/src/book/return.book.object'
import type { returnShelfObject } from '../../../apps/backend/src/shelf/return.shelf.object'
import type { returnUserObject } from '../../../apps/backend/src/user/return.user.object'
import type { UserLibraryFieldsEnum } from '../../../apps/backend/src/user/user.types'

export type UserProfileOutput = Prisma.UserGetPayload<{
	select: typeof returnUserObject & {
		picture: true
	}
}> & {
	bookCount: number
	totalPageCount: number
}

export interface UserLibraryOutput {
	[UserLibraryFieldsEnum.readingBooks]: Prisma.UserGetPayload<{
		select: {
			readingBooks: {
				select: typeof returnBookObjectWithAuthor
			}
		}
	}>['readingBooks']
	[UserLibraryFieldsEnum.finishedBooks]: Prisma.UserGetPayload<{
		select: {
			finishedBooks: {
				select: typeof returnBookObjectWithAuthor
			}
		}
	}>['finishedBooks']
	[UserLibraryFieldsEnum.watchedShelves]: Prisma.UserGetPayload<{
		select: {
			watchedShelves: {
				select: typeof returnShelfObject
			}
		}
	}>['watchedShelves']
	[UserLibraryFieldsEnum.hiddenShelves]: Prisma.UserGetPayload<{
		select: {
			hiddenShelves: {
				select: typeof returnShelfObject
			}
		}
	}>['hiddenShelves']
}

export interface UserUpdatePayload {
	email: string
	name: string
}

export interface UserUpdatePasswordPayload {
	password: string
	oldPassword: string
}

export interface FavoriteListOutput {
	readingBooks: number[]
	finishedBooks: number[]
	watchedShelves: number[]
	hiddenShelves: number[]
}

export interface ToggleOutput {
	message: string
	isExist: boolean
}

export type AllUsersOutput = Prisma.UserGetPayload<{
	select: typeof returnUserObject & {
		_count: {
			select: {
				finishedBooks: true
				readingBooks: true
				watchedShelves: true
				hiddenShelves: true
			}
		}
	}
}>[]
