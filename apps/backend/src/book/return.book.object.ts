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
	picture: true,
	likedPercentage: true
}


export const returnBookObjects: Prisma.BookSelect = {
	...defaultReturnObject,
	title: true,
	picture: true,
	likedPercentage: true
}
