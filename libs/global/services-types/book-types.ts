import type { Prisma } from '@prisma/client'
import type { returnAuthorObject } from '../../../apps/backend/src/author/return.author.object'
import type { returnBookObjectWithAuthor } from '../../../apps/backend/src/book/return.book.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'
import type { GetAllTypeOutput } from './utils'

export interface FeedbackBookPayload {
	rating: number
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

export type AllBooksOutput = GetAllTypeOutput<
	Prisma.BookGetPayload<{
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
>

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
