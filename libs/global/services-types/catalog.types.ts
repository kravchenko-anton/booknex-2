import type { Prisma } from '@prisma/client'
import type {
	returnBookObjectWithAuthor,
	returnBookObjectWithStatistics
} from '../../../apps/backend/src/book/return.book.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'

type BookWithAuthor = Prisma.BookGetPayload<{
	select: typeof returnBookObjectWithAuthor
}>[]

export interface FeaturedOutput {
	recommendations: BookWithAuthor
	relatedGenres: Prisma.GenreGetPayload<{
		select: typeof ReturnGenreObject
	}>[]
}

export type SearchOutput = Prisma.BookGetPayload<{
	select: typeof returnBookObjectWithStatistics
}>[]
