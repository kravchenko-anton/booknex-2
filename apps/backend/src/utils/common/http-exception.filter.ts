import {
	Catch,
	HttpException,
	type ArgumentsHost,
	type ExceptionFilter
} from '@nestjs/common'
import type { Request, Response } from 'express'
import { getTimeDate } from 'global/utils'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const context = host.switchToHttp()
		const response = context.getResponse<Response>()
		const request = context.getRequest<Request>()
		const status = exception.getStatus()

		response.status(status).json({
			statusCode: status,
			timestamp: getTimeDate().toISOString(),
			path: request.url,
			message: exception.message
		})
	}
}
