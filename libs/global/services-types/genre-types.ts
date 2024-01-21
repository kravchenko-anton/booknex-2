import type { Prisma } from '@prisma/client'
import type { ReturnGenreObject } from '../../../apps/backend/src/genre/return.genre.object'

export type AllGenreOutput = Prisma.GenreGetPayload<{
	select: typeof ReturnGenreObject & {
		color: true
	}
}>[]

export type GenreByIdOutput = Prisma.GenreGetPayload<{
	select: typeof ReturnGenreObject & {
		majorBooks: {
			select: {
				id: true
				title: true
				picture: true
			}
		}
	}
}>
