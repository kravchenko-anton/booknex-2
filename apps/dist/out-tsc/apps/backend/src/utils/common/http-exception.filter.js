import { __decorate } from "tslib";
import { Catch, HttpException } from '@nestjs/common';
import { getTimeDate } from 'global/utils';
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        const status = exception.getStatus();
        response.status(status).json({
            statusCode: status,
            timestamp: getTimeDate().toISOString(),
            path: request.url,
            message: exception.message
        });
    }
};
HttpExceptionFilter = __decorate([
    Catch(HttpException)
], HttpExceptionFilter);
export { HttpExceptionFilter };
//# sourceMappingURL=http-exception.filter.js.map