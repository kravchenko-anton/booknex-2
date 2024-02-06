import type { Prisma } from '@prisma/client'
import type { returnBookObject } from '../../../apps/backend/src/book/return.book.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'
import type { returnUserObject } from '../../../apps/backend/src/user/return.user.object'
import type { UserLibraryFieldsEnum } from '../../../apps/backend/src/user/user.types'
import type { ActivitiesOutput } from '../../../apps/backend/src/utils/activity-transformer'
import type { GetAllTypeOutput } from './utils'

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
				select: typeof returnBookObject
			}
		}
	}>['readingBooks']
	[UserLibraryFieldsEnum.finishedBooks]: Prisma.UserGetPayload<{
		select: {
			finishedBooks: {
				select: typeof returnBookObject
			}
		}
	}>['finishedBooks']
	[UserLibraryFieldsEnum.savedBooks]: Prisma.UserGetPayload<{
		select: {
			savedBooks: {
				select: typeof returnBookObject
			}
		}
	}>['savedBooks']
}

export type AllUsersOutput = GetAllTypeOutput<
	(Prisma.UserGetPayload<{
		select: typeof returnUserObject & {
			picture: true
			socialId: true
			role: true
			createdAt: true
			fullName: true
			location: true
			selectedGenres: {
				select: typeof ReturnGenreObject
			}
			_count: {
				select: {
					savedBooks: true
					feedback: true
					finishedBooks: true
					readingBooks: true
				}
			}
		}
	}> & {
		activities: ActivitiesOutput[]
	})[]
>
