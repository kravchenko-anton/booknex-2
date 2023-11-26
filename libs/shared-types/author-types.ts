import type { returnAuthorObjectWithDescription, returnFullAuthorObject } from '@/backend/author/return.author.object'
import type { Prisma } from '@prisma/client'


export type InfoByIdOutput = 	Prisma.AuthorGetPayload<{
	select: typeof returnFullAuthorObject
}>

export type AllAuthorOutput = Prisma.
	AuthorGetPayload<{
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

