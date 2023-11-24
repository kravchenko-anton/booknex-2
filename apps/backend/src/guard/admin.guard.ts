import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { ForbiddenException, Injectable } from '@nestjs/common'
import type { User } from '@prisma/client'
import { ErrorsEnum } from '../utils/errors'

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user
		if (!user.isAdmin)
			throw new ForbiddenException(ErrorsEnum.Not_Enough_Rights).getResponse()
		return true
	}
}
