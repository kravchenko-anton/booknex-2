import type { Prisma } from '@/prisma/generated'

export const ReturnGenreObject: Pick<
	Prisma.GenreSelect,
	'name' | 'slug' | 'icon'
> = {
	name: true,
	slug: true,
	icon: true
}
