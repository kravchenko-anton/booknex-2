import {
	HttpStatus,
	Injectable,
	type CanActivate,
	type ExecutionContext
} from '@nestjs/common'
import type { User } from '@prisma/client'
import { serverError } from '../utils/call-error'
import { AdminErrors } from '../utils/errors'

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user
		if (user.role !== 'ADMIN')
			return serverError(HttpStatus.FORBIDDEN, AdminErrors.notEnoughRights)
		return true
	}
}
