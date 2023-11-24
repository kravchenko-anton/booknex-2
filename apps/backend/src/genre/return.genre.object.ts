import type { Prisma } from '@prisma/client'
import type { returnBookObjectWithAuthor } from '../book/return.book.object'
import { defaultReturnObject } from '../utils/return.default.object'

export const ReturnGenreObject: Pick<Prisma.GenreSelect, 'name' | keyof typeof defaultReturnObject> = {
	...defaultReturnObject,
	name: true
}


export type ReturnGenreWithBooks = Prisma.GenreGetPayload<{
	select: typeof ReturnGenreObject & {
		books: {
			select: typeof returnBookObjectWithAuthor
		}
	} }>[]
