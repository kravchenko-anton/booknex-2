import type { Prisma } from '@prisma/client'

export const ReturnGenreObject: Pick<
	Prisma.GenreSelect,
	'name' | 'slug' | 'icon' | 'emoji'
> = {
	name: true,
	icon: true,
	slug: true,
	emoji: true
}
