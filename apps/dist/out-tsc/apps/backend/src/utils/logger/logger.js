import { __decorate } from "tslib";
import { Injectable, Logger } from '@nestjs/common';
import { msToSec } from '../helpers/msToSec';
let AppLoggerMiddleware = class AppLoggerMiddleware {
    constructor() {
        this.logger = new Logger('HTTP');
    }
    use(request, response, next) {
        const { method, originalUrl } = request;
        const startAt = process.hrtime();
        response.on('finish', () => {
            const { statusCode } = response;
            const diff = process.hrtime(startAt);
            const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;
            this.logger.log(`${method} ${originalUrl.replace('/api', '')} ${statusCode} ${msToSec(responseTime)}s`);
        });
        next();
    }
};
AppLoggerMiddleware = __decorate([
    Injectable()
], AppLoggerMiddleware);
export { AppLoggerMiddleware };
//# sourceMappingURL=logger.js.map