import type { Prisma } from '@prisma/client'
import { defaultReturnObject } from '../utils/return.default.object'

export const returnShelfObject: Pick<Prisma.ShelfSelect, 'title' | 'picture' | keyof typeof  defaultReturnObject> = {
	...defaultReturnObject,
	title: true,
	picture: true
}
