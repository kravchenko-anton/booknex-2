import type { Prisma } from '@prisma/client'
import type {
	returnBookObjectWithAuthor,
	returnBookObjectWithStatistics,
	returnColorBookObjectWithAuthor
} from '../../../apps/backend/src/book/return.book.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'

type BookWithAuthor = Prisma.BookGetPayload<{
	select: typeof returnBookObjectWithAuthor
}>[]

export interface ExploreOutput {
	popularNow: Prisma.BookGetPayload<{
		select: typeof returnColorBookObjectWithAuthor
	}>[]
	bestSellers: BookWithAuthor
	newReleases: BookWithAuthor
}
export interface FeaturedOutput {
	recommendations: BookWithAuthor
	relatedGenres: Prisma.GenreGetPayload<{
		select: typeof ReturnGenreObject
	}>[]
}

export type SearchExamplesOutput = {
	id: number
	title: string
}[]

export type SearchOutput = Prisma.BookGetPayload<{
	select: typeof returnBookObjectWithStatistics
}>[]
