import type { Prisma } from '@prisma/client'
import type { defaultReturnObject } from '../utils/common/return.default.object'

export const returnBookObject: Pick<
	Prisma.BookSelect,
	'title' | 'picture' | 'author' | keyof typeof defaultReturnObject
> = {
	id: true,
	title: true,
	picture: true,
	author: true
}
