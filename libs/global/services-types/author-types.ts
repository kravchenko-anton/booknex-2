import type { Prisma } from '@prisma/client'
import type {
	returnAuthorObjectWithDescription,
	returnFullAuthorObject
} from '../../../apps/backend/src/author/return.author.object'

export type InfoByIdOutput = Prisma.AuthorGetPayload<{
	select: typeof returnFullAuthorObject
}>

export type AllAuthorOutput = Prisma.AuthorGetPayload<{
	select: typeof returnAuthorObjectWithDescription
}>[]

export interface CreateAuthorPayload {
	name: string
	picture: string
	description: string
	books: number[]
}

export interface EditAuthorPayload {
	name?: string
	picture?: string
	description?: string
	books?: number[]
}
