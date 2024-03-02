import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthDto, AuthResponseDto, RefreshDto, SignDto } from './dto/auth.dto'

@ApiTags('🔐 auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/google-sign')
	@ApiOkResponse({
		description: 'Return access and refresh token',
		type: AuthResponseDto
	})
	@ApiBody({
		type: SignDto,
		description: 'Sign in with google account'
	})
	async googleSign(@Body() dto: SignDto): Promise<AuthResponseDto> {
		return this.authService.googleSign(dto)
	}

	@Post('/mail-register')
	@ApiBody({
		type: AuthDto,
		description: 'Register new user'
	})
	@ApiOkResponse({
		description: 'Return access and refresh token',
		type: AuthResponseDto
	})
	async register(@Body() dto: AuthDto): Promise<AuthResponseDto> {
		return this.authService.register(dto)
	}

	@Post('/mail-login')
	@ApiBody({
		type: AuthDto,
		description: 'Login user'
	})
	@ApiOkResponse({
		description: 'Return access and refresh token',
		type: AuthResponseDto
	})
	async login(@Body() dto: AuthDto): Promise<AuthResponseDto> {
		return this.authService.login(dto)
	}

	@Post('/refresh')
	@ApiBody({
		type: RefreshDto,
		description: 'Refresh access token'
	})
	@ApiOkResponse({
		description: 'Return access token',
		type: AuthResponseDto
	})
	async refreshToken(@Body() dto: RefreshDto): Promise<AuthResponseDto> {
		return this.authService.refresh(dto.refreshToken)
	}
}
