import type { Prisma } from '@/prisma/generated'

export const returnBookObject: Pick<
	Prisma.BookSelect,
	'title' | 'picture' | 'author' | 'slug'
> = {
	slug: true,
	title: true,
	picture: true,
	author: true
}
