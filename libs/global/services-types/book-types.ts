import type { Prisma } from '@prisma/client'
import type { returnAuthorObject } from '../../../apps/backend/src/author/return.author.object'
import type { returnBookObjectWithAuthor } from '../../../apps/backend/src/book/return.book.object'
import type { returnReviewsObject } from '../../../apps/backend/src/book/return.reviews.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'
import type { defaultReturnObject } from '../../../apps/backend/src/utils/return.default.object'

export type EmotionOutput = Prisma.EmotionGetPayload<{
	select: typeof defaultReturnObject & {
		name: true
		path: true
	}
}>[]

export interface ReviewBookPayload {
	emotion: string
	tags: string[]
	comment: string
}

export type BookByIdOutput = Prisma.BookGetPayload<{
	include: {
		majorGenre: false
		author: {
			select: typeof returnAuthorObject
		}
		genres: { select: typeof ReturnGenreObject }
	}
}> & {
	similarBooks: Prisma.BookGetPayload<{
		select: typeof returnBookObjectWithAuthor
	}>[]
}
export type AllSelectBooksOutput = Prisma.BookGetPayload<{
	select: {
		id: true
		title: true
	}
}>[]

export type AllBooksOutput = Prisma.BookGetPayload<{
	select: typeof returnBookObjectWithAuthor & {
		genres: { select: typeof ReturnGenreObject }
		pages: true
		popularity: true
		visible: true
		description: true
		majorGenre: {
			select: typeof ReturnGenreObject
		}
	}
}>[]

export type ReviewByIdOutput = Prisma.ReviewGetPayload<{
	select: typeof returnReviewsObject
}>[]

export interface BookPayload {
	title: string
	author: {
		id: number
	}
	description: string
	picture: string
	file: string
	chapters: { name: string; children: { name: string; link: string }[] }[]
	pages: number
	popularity: number
	genres: number[]
}

export type EpubOutput = Prisma.BookGetPayload<{
	select: {
		chapters: true
		title: true
		file: true
	}
}>
