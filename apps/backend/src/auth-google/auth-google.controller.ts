import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthGoogleService } from './auth-google.service'
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthGoogleController {
	constructor(private readonly authGoogleService: AuthGoogleService) {}
	@Post('login')
	@HttpCode(HttpStatus.OK)
	async login(@Body() loginDto: AuthGoogleLoginDto) {
		const socialData = await this.authGoogleService.getProfileByToken(loginDto)

		return this.authGoogleService.validateSocialLogin(socialData)
	}
}
