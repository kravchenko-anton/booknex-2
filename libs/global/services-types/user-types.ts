import type { getAllTypeOutput } from '@booknex/global/services-types/utils'
import type { Prisma } from '@prisma/client'
import type { returnBookObjectWithAuthor } from '../../../apps/backend/src/book/return.book.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'
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

export type AllUsersOutput = getAllTypeOutput<
	Prisma.UserGetPayload<{
		select: typeof returnUserObject & {
			selectedGenres: {
				select: typeof ReturnGenreObject
			}
			_count: {
				select: {
					activity: true
					savedBooks: true
					finishedBooks: true
					readingBooks: true
				}
			}
		}
	}>[]
>
