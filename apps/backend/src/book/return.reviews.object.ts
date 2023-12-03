import type { Prisma } from '@prisma/client'
import { defaultReturnObject } from '../utils/return.default.object'

export const returnReviewsObject: Pick<
	Prisma.ReviewSelect,
	'text' | 'emotion' | 'tags' | keyof typeof defaultReturnObject
> = {
	...defaultReturnObject,
	text: true,
	emotion: true,
	tags: true
}
