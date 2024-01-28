import type { Prisma } from '@prisma/client'
import type { returnBookObject } from '../../../apps/backend/src/book/return.book.object'
import type { returnCollectionObject } from '../../../apps/backend/src/collection/return.collection.object'

export type CollectionByIdOutput = Prisma.CollectionGetPayload<{
	select: typeof returnCollectionObject & {
		description: true
		books: {
			select: typeof returnBookObject & {
				pages: true
			}
		}
	}
}> & {
	statistics: {
		Books: number
	}
}

export type CollectionCatalogOutput = Prisma.CollectionGetPayload<{
	select: typeof returnCollectionObject
}>[]

export type AllCollectionOutput = Prisma.CollectionGetPayload<{
	select: typeof returnCollectionObject
}>[]
