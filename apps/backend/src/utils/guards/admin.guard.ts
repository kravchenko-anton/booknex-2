import { HttpStatus, Injectable, type CanActivate, type ExecutionContext } from '@nestjs/common';
import { Role, type User } from '@prisma/client';
import { AdminErrors } from '../../../../../libs/global/errors';
import { serverError } from '../helpers/call-error';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;
    if (user.role !== Role.admin)
      throw serverError(HttpStatus.FORBIDDEN, AdminErrors.notEnoughRights);
    return true;
  }
}
