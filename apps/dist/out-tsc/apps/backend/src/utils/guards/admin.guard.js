import { __decorate } from "tslib";
import { HttpStatus, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { adminErrors } from 'global/errors';
import { serverError } from '../helpers/server-error';
let AdminGuard = class AdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (user.role !== Role.admin)
            throw serverError(HttpStatus.FORBIDDEN, adminErrors.notEnoughRights);
        return true;
    }
};
AdminGuard = __decorate([
    Injectable()
], AdminGuard);
export { AdminGuard };
//# sourceMappingURL=admin.guard.js.map