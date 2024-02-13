import type { Prisma } from '@prisma/client'
import type { returnBookObject } from '../../../apps/backend/src/book/return.book.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'
import type { returnUserObject } from '../../../apps/backend/src/user/return.user.object'
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

export type UserLibraryOutput = Prisma.UserGetPayload<{
	select: {
		savedBooks: {
			select: typeof returnBookObject
		}
		finishedBooks: {
			select: typeof returnBookObject
		}
		readingBooks: {
			select: typeof returnBookObject
		}
	}
}>

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
