import { type NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
export declare class AppLoggerMiddleware implements NestMiddleware {
    private logger;
    use(request: Request, response: Response, next: NextFunction): void;
}
