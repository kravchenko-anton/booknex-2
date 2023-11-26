import type { returnShelfObject } from '@/backend/shelf/return.shelf.object'
import type { Prisma } from '@prisma/client'

export type ShelfByIdOutput = Prisma.ShelfGetPayload<{
	select: typeof returnShelfObject & {
		description: true
	}
}> & {
	statistics: {
		'Books': number
		'Watched': number
	}
}

export type ShelfCatalogOutput = Prisma.ShelfGetPayload<{
	select: typeof returnShelfObject
}>[]

export type AllShelfOutput = Prisma.ShelfGetPayload<{
	select: typeof returnShelfObject
}>[]
