import type { returnAuthorWithPicture } from '@/backend/author/return.author.object'
import type { returnBookObjectWithAuthor } from '@/backend/book/return.book.object'
import type { ReturnGenreObject } from '@/backend/genre/return.genre.object'
import type { Prisma } from '@prisma/client'

export type AllGenreOutput = Prisma.GenreGetPayload<{
	select: typeof ReturnGenreObject &  {
		color: true
	}
}>[]

 export type GenreByIdOutput = Prisma.GenreGetPayload<{
	 select: typeof ReturnGenreObject & {
		 color: true,
		 similar: {
			 select: {
				 id: true
			 }
		 }
	 }
 }> & {
	 newestBooks: Prisma.BookGetPayload<{
		 select: typeof  returnBookObjectWithAuthor & {
			 color: true,
			 description: true
		 },
	 }>[],
	 bestSellers: Prisma.BookGetPayload<{
		 select: typeof  returnBookObjectWithAuthor
	 }>[],

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
