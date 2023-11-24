import type { Prisma } from '@prisma/client'
import type { returnAuthorObject } from '../../../apps/backend/src/author/return.author.object'
import type { returnBookObjectWithAuthor } from '../../../apps/backend/src/book/return.book.object'
import type { returnReviewsObject } from '../../../apps/backend/src/book/return.reviews.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'
import type { defaultReturnObject } from '../../../apps/backend/src/utils/return.default.object'

export type EmotionOutput = Prisma.EmotionGetPayload<{
	select: typeof  defaultReturnObject & {
		name: true,
		path: true
	}
}>[]

export interface ReviewBookPayload {
	emotion: string
	tags: string[]
	comment: string
}

export type BookByIdOutput = ((Prisma.BookGetPayload<{
	include: {
		majorGenre: false,
		author: {
			select: typeof returnAuthorObject
		},
		genres: { select: typeof ReturnGenreObject }
	}
}>) & {
	similarBooks: (Prisma.BookGetPayload<{
		select: typeof returnBookObjectWithAuthor
	}>)[]
})

export type AllBooksOutput = Prisma.BookGetPayload<{
	select: typeof returnBookObjectWithAuthor
}>[]

export type ReviewByIdOutput = Prisma.ReviewGetPayload<{
	select: typeof returnReviewsObject
}>[]
export interface BookPayload {
	title: string;
	author: {
		name: string;
	};
	description: string;
	picture: string;
file: string
charapters: {
	name: string
	link: string
}[]
	pages: number;
	likedPercentage: number;
	popularity: number;
	majorGenre: string;
	genres: string[];
}




export type GetEbpubOutput = Prisma.BookGetPayload<{
	select: {
		charapters: true,
		file: true
	}
}>
