import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type { AuthPayload } from '../../../../libs/global/services-types/auth-types'
import { AuthService } from './auth.service'
import { AuthDto, RefreshDto, RegisterDto } from './dto/auth.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/register')
	async register(@Body() dto: RegisterDto): Promise<AuthPayload> {
		return this.authService.register(dto)
	}

	@Post('/login')
	async login(@Body() dto: AuthDto): Promise<AuthPayload> {
		return this.authService.login(dto)
	}

	@Post('/access-token')
	async refreshToken(@Body() dto: RefreshDto): Promise<AuthPayload> {
		return this.authService.refresh(dto.refreshToken)
	}
}
