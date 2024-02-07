import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import type { AuthPayload } from '../../../../libs/global/services-types/auth-types'
import { AuthService } from './auth.service'
import { AuthDto, RefreshDto, SignDto } from './dto/auth.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/google-sign')
	async googleSign(@Body() dto: SignDto) {
		return this.authService.googleSign(dto)
	}

	@Post('/mail-register')
	@ApiBody({
		type: AuthDto,
		description: 'Register new user'
	})
	async register(@Body() dto: AuthDto): Promise<AuthPayload> {
		return this.authService.register(dto)
	}

	@Post('/mail-login')
	@ApiBody({
		type: AuthDto,
		description: 'Login user'
	})
	async login(@Body() dto: AuthDto): Promise<AuthPayload> {
		return this.authService.login(dto)
	}

	@Post('/refresh')
	async refreshToken(@Body() dto: RefreshDto): Promise<AuthPayload> {
		return this.authService.refresh(dto.refreshToken)
	}
}
