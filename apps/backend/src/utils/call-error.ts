import { HttpException, type HttpStatus } from '@nestjs/common'

export const serverError = (code: HttpStatus, message: string) => {
	throw new HttpException(
		{
			status: code,
			error: message
		},
		code
	)
}
