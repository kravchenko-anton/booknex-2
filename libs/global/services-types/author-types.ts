import type { Prisma } from '@prisma/client'
import {
	returnAuthorObject,
	returnAuthorObjectWithDescription,
	returnFullAuthorObject
} from '../../../apps/backend/src/author/return.author.object'

export type InfoByIdOutput = Prisma.AuthorGetPayload<{
	select: typeof returnFullAuthorObject
}>

export type AllAuthorOutput = Prisma.AuthorGetPayload<{
	select: typeof returnAuthorObjectWithDescription
}>[]

export type CreateAuthorOutput = Prisma.AuthorGetPayload<{
	select: typeof returnAuthorObject
}>

export interface CreateAuthorPayload {
	name: string
	picture: string
	description: string
}

export interface EditAuthorPayload {
	name?: string
	picture?: string
	description?: string
	books?: number[]
}
