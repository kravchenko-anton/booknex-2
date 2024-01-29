import type { Prisma } from '@prisma/client'
import type { returnBookObject } from '../../../apps/backend/src/book/return.book.object'
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
		genres: { select: typeof ReturnGenreObject }
	}
}> & {
	similarBooks: Prisma.BookGetPayload<{
		select: typeof returnBookObject
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
		select: typeof returnBookObject & {
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
	author: string
	description: string
	picture: string
	ebook: string
	pages: number
	popularity: number
	genres: number[]
}

export type EpubOutput = {
	chapters: ChaptersType
	title: string
	file: string[]
}

export type ChaptersType = {
	name: string
	children: { title: string; link: string }[]
}[]
