import type { Prisma } from '@prisma/client'
import { defaultReturnObject } from '../utils/return.default.object'

export const returnUserObject: Pick<
	Prisma.UserSelect,
	'email' | keyof typeof defaultReturnObject
> = {
	...defaultReturnObject,
	email: true
}
