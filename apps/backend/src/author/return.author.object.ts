import type { Prisma } from '@prisma/client'
import { returnBookObject } from '../book/return.book.object'
import { defaultReturnObject } from '../utils/return.default.object'

export const returnAuthorObject: Pick<
	Prisma.AuthorSelect,
	'name' | keyof typeof defaultReturnObject
> = {
	...defaultReturnObject,
	name: true
}

export const returnFullAuthorObject: Omit<Prisma.AuthorSelect, '_count'> = {
	...returnAuthorObject,
	picture: true,
	description: true,
	color: true,
	books: {
		select: returnBookObject
	}
}

export const returnAuthorWithPicture: Pick<
	Prisma.AuthorSelect,
	'name' | 'picture' | keyof typeof defaultReturnObject
> = {
	...returnAuthorObject,
	picture: true
}
export const returnAuthorObjectWithDescription: Pick<
	Prisma.AuthorSelect,
	'name' | 'picture' | 'description' | keyof typeof defaultReturnObject
> = { ...returnAuthorObject, picture: true, description: true }
