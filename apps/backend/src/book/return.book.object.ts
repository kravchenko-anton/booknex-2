import type { Prisma } from '@prisma/client'
import { defaultReturnObject } from '../utils/common/return.default.object'

export const returnBookObject: Pick<
	Prisma.BookSelect,
	'title' | 'picture' | 'author' | 'slug' | keyof typeof defaultReturnObject
> = {
	slug: true,
	title: true,
	picture: true,
	author: true
}
