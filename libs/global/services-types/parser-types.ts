import type { Prisma } from '@prisma/client'
import type { defaultReturnObject } from '../../../apps/backend/src/utils/return.default.object'
import type { GetAllTypeOutput } from './utils'

export type AllGoodReadBookOutput = GetAllTypeOutput<
	Prisma.BookTemplateGetPayload<{
		select: typeof defaultReturnObject & {
			title: true
			pages: true
			description: true
			author: true
			genres: true
			picture: true
			popularity: true
		}
	}>[]
>

export type ByIdOutput = Prisma.BookTemplateGetPayload<{
	select: typeof defaultReturnObject & {
		title: true
		pages: true
		description: true
		author: true
		picture: true
		genres: true
		popularity: true
	}
}>

export interface ParserDtoPayload {
	url: string
	page: number
}

export type UnfoldOutput = {
	id: string
	title: string
	content: string
}[]
