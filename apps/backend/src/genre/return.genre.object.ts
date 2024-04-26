import type { Prisma } from '@prisma/client'

export const ReturnGenreObject: Pick<
	Prisma.GenreSelect,
	'name' | 'slug' | 'icon'
> = {
	name: true,
	slug: true,
	icon: true
}
