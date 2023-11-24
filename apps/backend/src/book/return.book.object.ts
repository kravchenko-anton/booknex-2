import type { Prisma } from '@prisma/client'
import { defaultReturnObject } from '../utils/return.default.object'

export const returnBookObjectWithAuthor: Pick<Prisma.BookSelect, 'title' | 'picture' | 'author' | keyof typeof defaultReturnObject> = {
	...defaultReturnObject,
	title: true,
	picture: true,
	author: {
		select: {
			name: true
		}
	},
}


export const returnColorBookObjectWithAuthor = {
	...returnBookObjectWithAuthor,
	description: true,
	color: true
}

export const returnBookObjectWithPages = {
		...returnBookObjectWithAuthor,
		pages: true
}
export const returnBookObjectWithStatistics = {
	...returnBookObjectWithAuthor,
	likedPercentage: true,
	pages: true
}
export const returnBookObject: Pick<Prisma.BookSelect, 'title' | 'picture' | keyof typeof defaultReturnObject> = {
	...defaultReturnObject,
	title: true,
	picture: true,
}
