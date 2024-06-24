import type { Prisma } from '@prisma/client'

export const returnBookObject: Pick<
	Prisma.BookSelect,
	'title' | 'picture' | 'author' | 'slug' | 'rating'
> = {
	slug: true,
	title: true,
	picture: true,
	author: true,
	rating: true
}
