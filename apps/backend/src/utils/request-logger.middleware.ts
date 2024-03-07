import { Injectable, Logger, type NestMiddleware } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
	private readonly logger = new Logger()

	use(request: Request, res: Response, next: NextFunction) {
		res.on('finish', () => {
			const statusCode = res.statusCode
			if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
				this.logger.warn(`[${request.method}] ${request.url} - ${statusCode}`)
			}
		})

		next()
	}
}
