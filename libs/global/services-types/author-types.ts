import type { getAllTypeOutput } from '@booknex/global/services-types/utils'
import type { Prisma } from '@prisma/client'
import type {
	returnAuthorObject,
	returnAuthorObjectWithDescription,
	returnFullAuthorObject
} from '../../../apps/backend/src/author/return.author.object'

export type InfoByIdOutput = Prisma.AuthorGetPayload<{
	select: typeof returnFullAuthorObject
}>

export type AllAuthorOutput = getAllTypeOutput<
	Prisma.AuthorGetPayload<{
		select: typeof returnAuthorObjectWithDescription & {
			books: {
				select: {
					id: true
					picture: true
					visible: true
				}
			}
		}
	}>[]
>

export type AllSelectAuthorOutput = Prisma.AuthorGetPayload<{
	select: {
		id: true
		name: true
	}
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
