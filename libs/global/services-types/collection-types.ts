import type { Prisma } from '@prisma/client'
import type { returnBookObjectWithAuthor } from '../../../apps/backend/src/book/return.book.object'
import type { returnCollectionObject } from '../../../apps/backend/src/collection/return.collection.object'

export type ShelfByIdOutput = Prisma.CollectionGetPayload<{
	select: typeof returnCollectionObject & {
		description: true
		books: {
			select: typeof returnBookObjectWithAuthor & {
				pages: true
			}
		}
	}
}> & {
	statistics: {
		Books: number
	}
}

export type ShelfCatalogOutput = Prisma.CollectionGetPayload<{
	select: typeof returnCollectionObject
}>[]

export type AllShelfOutput = Prisma.CollectionGetPayload<{
	select: typeof returnCollectionObject
}>[]
