import { HttpException } from '@nestjs/common';
export const serverError = (code, message) => new HttpException({
    status: code,
    message
}, code);
//# sourceMappingURL=server-error.js.map