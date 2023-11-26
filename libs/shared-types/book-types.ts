import type { returnAuthorObject } from '@/backend/author/return.author.object'
import type { returnBookObjectWithAuthor } from '@/backend/book/return.book.object'
import type { returnReviewsObject } from '@/backend/book/return.reviews.object'
import type { ReturnGenreObject } from '@/backend/genre/return.genre.object'
import type { defaultReturnObject } from '@/backend/utils/return.default.object'
import type { Prisma } from '@prisma/client'

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




export type EbpubOutput = Prisma.BookGetPayload<{
	select: {
		charapters: true,
		file: true
	}
}>
