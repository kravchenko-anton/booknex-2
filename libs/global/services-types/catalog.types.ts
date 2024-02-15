import type { Prisma } from '@prisma/client'
import type { returnBookObject } from '../../../apps/backend/src/book/return.book.object'

type BookWithAuthor = Prisma.BookGetPayload<{
	select: typeof returnBookObject
}>[]
type ColorBookWithAuthor = Prisma.BookGetPayload<{
	select: typeof returnBookObject
}>[]

export interface FeaturedOutput {
	recommendations: BookWithAuthor
	relatedGenres: Prisma.GenreGetPayload<{
		select: {
			id: true
			name: true
		}
	}>[]
	popularBooks: ColorBookWithAuthor
	bestSellingBooks: BookWithAuthor
	newReleases: BookWithAuthor
}

export type SearchOutput = Prisma.BookGetPayload<{
	select: typeof returnBookObject
}>[]
