import { Role, type User } from '@/prisma/generated'
import {
	HttpStatus,
	Injectable,
	type CanActivate,
	type ExecutionContext
} from '@nestjs/common'
import { adminErrors } from 'global/errors'
import { serverError } from '../helpers/server-error'

@Injectable()
export class AdminGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{ user: User }>()
		const user = request.user
		if (user.role !== Role.admin)
			throw serverError(HttpStatus.FORBIDDEN, adminErrors.notEnoughRights)
		return true
	}
}
