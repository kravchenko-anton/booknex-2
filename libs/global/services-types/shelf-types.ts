import type { Prisma } from '@prisma/client'
import type { returnBookObjectWithAuthor } from '../../../apps/backend/src/book/return.book.object'
import type { returnShelfObject } from '../../../apps/backend/src/shelf/return.shelf.object'

export type ShelfByIdOutput = Prisma.ShelfGetPayload<{
	select: typeof returnShelfObject & {
		description: true,
		books: {
			select: typeof returnBookObjectWithAuthor & {
				pages: true
			}
		}
	}
}> & {
	statistics: {
		Books: number
		Watched: number
	}
}

export type ShelfCatalogOutput = Prisma.ShelfGetPayload<{
	select: typeof returnShelfObject
}>[]

export type AllShelfOutput = Prisma.ShelfGetPayload<{
	select: typeof returnShelfObject
}>[]
