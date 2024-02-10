import type { Prisma } from '@prisma/client'
import type { returnBookObject } from '../../../apps/backend/src/book/return.book.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'

type BookWithAuthor = Prisma.BookGetPayload<{
	select: typeof returnBookObject
}>[]
type ColorBookWithAuthor = Prisma.BookGetPayload<{
	select: typeof returnBookObject
}>[]

export interface FeaturedOutput {
	recommendations: BookWithAuthor
	relatedGenres: Prisma.GenreGetPayload<{
		select: typeof ReturnGenreObject
	}>[]
	popularBooks: ColorBookWithAuthor
	bestSellingBooks: BookWithAuthor
	newReleases: BookWithAuthor
}

export type SearchOutput = Prisma.BookGetPayload<{
	select: typeof returnBookObject
}>[]
