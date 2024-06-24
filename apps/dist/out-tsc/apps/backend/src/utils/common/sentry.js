import { __decorate } from "tslib";
import { Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as Sentry from '@sentry/node';
let SentryFilter = class SentryFilter extends BaseExceptionFilter {
    catch(exception, host) {
        Sentry.captureException(exception);
        super.catch(exception, host);
    }
};
SentryFilter = __decorate([
    Catch()
], SentryFilter);
export { SentryFilter };
//# sourceMappingURL=sentry.js.map