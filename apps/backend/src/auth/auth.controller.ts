import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type { AuthPayload } from '../../../../libs/global/services-types/auth-types'
import { AuthService } from './auth.service'
import { RefreshDto, SignDto } from './dto/auth.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/')
	async sign(@Body() dto: SignDto): Promise<AuthPayload> {
		return this.authService.sign(dto)
	}

	@Post('/refresh')
	async refreshToken(@Body() dto: RefreshDto): Promise<AuthPayload> {
		return this.authService.refresh(dto.refreshToken)
	}
}
