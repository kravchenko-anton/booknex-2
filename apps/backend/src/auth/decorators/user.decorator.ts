import type { User } from '@/prisma/generated'
import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'

export const CurrentUser = createParamDecorator(
	(data: keyof User, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest()
		const user = request.user
		return data ? user?.[data] : user
	}
)
