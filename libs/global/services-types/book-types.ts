import type { Prisma } from '@prisma/client'
import type { returnBookObject } from '../../../apps/backend/src/book/return.book.object'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'
import type { defaultReturnObject } from '../../../apps/backend/src/utils/return.default.object'
import type { GetAllTypeOutput } from './utils'

export interface FeedbackBookPayload {
	rating: number
	tags: string[]
	comment: string
}

export type InfoByIdAdmin = Prisma.BookGetPayload<{
	select: typeof returnBookObject & {
		pages: true
		createdAt: true
		updatedAt: true
		genres: { select: typeof ReturnGenreObject }
		popularity: true
		ebook: true
		description: true
		feedback: {
			select: typeof defaultReturnObject & {
				tags: true
				text: true
				rating: true
				user: {
					select: {
						id: true
						email: true
					}
				}
			}
		}
		visible: true
		_count: {
			select: {
				finishedBy: true
				readingBy: true
				savedBy: true
			}
		}
	}
}> & {
	activities: {
		level: number
		date: string
		count: number
		activities: string[]
	}[]
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

export type BookUpdatePayload = Partial<
	BookPayload & {
		visible: boolean
	}
>

export interface EpubOutputType {
	chapters: ChaptersType
	title: string
	file: string[]
}

export type ChaptersType = {
	name: string
	children: { title: string; link: string }[]
}[]
