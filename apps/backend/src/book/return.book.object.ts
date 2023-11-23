import type { Prisma } from '@prisma/client'
import { defaultReturnObject } from '../utils/return.default.object'

export const returnBookObjectWithAuthor: Prisma.BookSelect = {
	...defaultReturnObject,
	title: true,
	author: {
		select: {
			name: true
		}
	},
	picture: true
}


export const returnBookObject: Pick<Prisma.BookSelect, 'title' | 'picture' | 'id'> = {
	...defaultReturnObject,
	title: true,
	picture: true,
}
