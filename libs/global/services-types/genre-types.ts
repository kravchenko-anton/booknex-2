import type { Prisma } from '@prisma/client'
import type { returnAuthorWithPicture } from '../../../apps/backend/src/author/return.author.object'
import type { returnBookObjectWithAuthor } from '../../../apps/backend/src/book/return.book.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'

export type AllGenreOutput = Prisma.GenreGetPayload<{
	select: typeof ReturnGenreObject & {
		color: true
	}
}>[]

export type GenreByIdOutput = Prisma.GenreGetPayload<{
	select: typeof ReturnGenreObject & {
		color: true
	}
}> & {
	newestBooks: Prisma.BookGetPayload<{
		select: typeof returnBookObjectWithAuthor & {
			color: true
			description: true
		}
	}>[]
	bestSellers: Prisma.BookGetPayload<{
		select: typeof returnBookObjectWithAuthor
	}>[]

	bestSellersFromSimilar: Prisma.GenreGetPayload<{
		select: typeof ReturnGenreObject & {
			majorBooks: {
				select: typeof returnBookObjectWithAuthor
			}
		}
	}>[]
	bestAuthors: Prisma.AuthorGetPayload<{
		select: typeof returnAuthorWithPicture
	}>[]
}
