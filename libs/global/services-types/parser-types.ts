import type { Prisma } from '@prisma/client'
import type { defaultReturnObject } from '../../../apps/backend/src/utils/return.default.object'

export type AllGoodReadBookOutput = Prisma.GoodReadBookGetPayload<{
  select: typeof defaultReturnObject & {
    title: true,
    pages: true,
    description: true,
    authorPicture: true,
    authorDescription: true,
    authorName: true,
    genres: true,
    picture: true,
    popularity: true
}
}>[]

export interface ParserDtoPayload {
  url: string
  page: number
}
