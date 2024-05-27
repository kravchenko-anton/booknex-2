import type { Prisma } from '@prisma/client'

export const ReturnGenreObject: Pick<
	Prisma.GenreSelect,
	'name' | 'slug' | 'icon' | 'emoji'
> = {
	name: true,
	slug: true,
	emoji: true
}
