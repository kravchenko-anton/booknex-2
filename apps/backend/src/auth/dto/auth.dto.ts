import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'
import 'reflect-metadata'

export class SignDto {
	@IsString()
	socialId: string
}

export class RefreshDto {
	@IsString()
	refreshToken: string
}

export class AuthDto {
	@ApiProperty({
		example: 'test@gmail.com',
		description: "User's email",
		format: 'email',
		required: true
	})
	@IsEmail()
	email: string

	@MinLength(8, {
		message: 'Password is too short. Minimal length is 8'
	})
	@IsString()
	password: string
}
