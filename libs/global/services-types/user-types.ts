import type { Prisma } from '@prisma/client'
import type { returnBookObjectWithAuthor } from '../../../apps/backend/src/book/return.book.object'
import type { returnUserObject } from '../../../apps/backend/src/user/return.user.object'
import type { UserLibraryFieldsEnum } from '../../../apps/backend/src/user/user.types'

export type UserProfileOutput = Prisma.UserGetPayload<
	{
		select: typeof returnUserObject
	} & {
		bookCount: number
		totalPageCount: number
	}
>

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
	[UserLibraryFieldsEnum.savedBooks]: Prisma.UserGetPayload<{
		select: {
			savedBooks: {
				select: typeof returnBookObjectWithAuthor
			}
		}
	}>['savedBooks']
}

export interface UserUpdatePasswordPayload {
	password: string
	oldPassword: string
}

export interface FavoriteListOutput {
	readingBooks: number[]
	finishedBooks: number[]
	savedBooks: number[]
}

export interface ToggleOutput {
	message: string
}

export type AllUsersOutput = Prisma.UserGetPayload<{
	select: typeof returnUserObject & {
		_count: {
			select: {
				finishedBooks: true
				readingBooks: true
			}
		}
	}
}>[]
