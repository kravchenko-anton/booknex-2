import type { Prisma } from '@/prisma/generated'

export const returnUserObject: Pick<Prisma.UserSelect, 'email' | 'id'> = {
	id: true,
	email: true
}
