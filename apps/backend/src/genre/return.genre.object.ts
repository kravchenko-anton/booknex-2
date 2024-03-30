import type { Prisma } from '@prisma/client'
import { defaultReturnObject } from '../utils/common/return.default.object'

export const ReturnGenreObject: Pick<
	Prisma.GenreSelect,
	'name' | 'slug' | 'icon' | keyof typeof defaultReturnObject
> = {
	...defaultReturnObject,
	name: true,
	slug: true,
	icon: true
}
