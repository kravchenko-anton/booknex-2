import type { Prisma } from '@prisma/client'
import type { defaultReturnObject } from '../../../apps/backend/src/utils/return.default.object'

export type AllGoodReadBookOutput = {
	data: Prisma.GoodReadBookGetPayload<{
		select: typeof defaultReturnObject & {
			title: true
			pages: true
			description: true
			authorPicture: true
			authorDescription: true
			authorName: true
			genres: true
			picture: true
			popularity: true
		}
	}>[]
	totalPages: number
	canLoadMore: boolean
}

export interface ParserDtoPayload {
	url: string
	page: number
}

export type UnfoldOutput = {
	id: string
	title: string
	content: string
}[]
