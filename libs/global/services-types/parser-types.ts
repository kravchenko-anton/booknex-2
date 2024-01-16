import type { getAllTypeOutput } from '@booknex/global/services-types/utils'
import type { Prisma } from '@prisma/client'
import type { defaultReturnObject } from '../../../apps/backend/src/utils/return.default.object'

export type AllGoodReadBookOutput = getAllTypeOutput<
	Prisma.GoodReadBookGetPayload<{
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
>

export interface ParserDtoPayload {
	url: string
	page: number
}

export type UnfoldOutput = {
	id: string
	title: string
	content: string
}[]
