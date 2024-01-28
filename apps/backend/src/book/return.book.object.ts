import type { Prisma } from '@prisma/client'
import { defaultReturnObject } from '../utils/return.default.object'

export const returnBookObject: Pick<
	Prisma.BookSelect,
	'title' | 'picture' | 'author' | keyof typeof defaultReturnObject
> = {
	...defaultReturnObject,
	title: true,
	picture: true,
	author: true
}
