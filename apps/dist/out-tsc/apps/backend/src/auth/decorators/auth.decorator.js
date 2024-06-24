import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../../utils/guards/admin.guard';
import { JwtGuard } from '../../utils/guards/jwt.guard';
export const Auth = (role = 'user') => applyDecorators(role === 'admin' ? UseGuards(JwtGuard, AdminGuard) : UseGuards(JwtGuard));
//# sourceMappingURL=auth.decorator.js.map