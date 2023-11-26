import type {
	returnBookObjectWithAuthor,
	returnBookObjectWithPages, returnBookObjectWithStatistics,
	returnColorBookObjectWithAuthor
} from '@/backend/book/return.book.object'
import type { ReturnGenreObject, ReturnGenreWithBooks } from '@/backend/genre/return.genre.object'
import type { Prisma } from '@prisma/client'

type BookWithAuthor = Prisma.BookGetPayload<{
	select: typeof returnBookObjectWithAuthor
}>[]





export interface CatalogOutput {
	recommendations: BookWithAuthor
	popularNow: Prisma.BookGetPayload<{
		select: typeof returnColorBookObjectWithAuthor
	}>[]
	bestSellers: BookWithAuthor
	newReleases: BookWithAuthor
	sameBreath: Prisma.BookGetPayload<{
		select: typeof returnBookObjectWithPages
	}>[]
	genres: ReturnGenreWithBooks
	mostRelatedGenres: Prisma.GenreGetPayload<{
		select: typeof ReturnGenreObject
	}>[]
}

export type SearchExamplesOutput = {
	id: number,
	title: string
}[]


export type SearchOutput = Prisma.BookGetPayload<{
	select: typeof returnBookObjectWithStatistics
}>[]
