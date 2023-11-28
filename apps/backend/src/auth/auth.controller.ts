import { Body, Controller, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type { AuthPayload, CheckEmailOutput } from '../../../../libs/global/services-types/auth-types'
import { AuthService } from './auth.service'
import { AuthDto, RefreshDto, RegisterDto } from './dto/auth.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}
	@Put('/check-email/:email')
	async checkEmail(@Param('email') email: string):Promise<CheckEmailOutput> {
		return this.authService.checkEmail(email)
	}

	@Post('/register')
	async register(@Body() dto: RegisterDto):Promise<AuthPayload> {
		return this.authService.register(dto)
	}

	@Post('/login')
	async login(@Body() dto: AuthDto):Promise<AuthPayload> {
		return this.authService.login(dto)
	}

	@Post('/access-token')
	async refreshToken(@Body() dto: RefreshDto): Promise<AuthPayload> {
		return this.authService.refresh(dto.refreshToken)
	}
}
