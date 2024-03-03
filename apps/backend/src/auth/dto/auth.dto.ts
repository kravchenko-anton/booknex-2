import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'

export class GoogleAuthDto {
	@ApiProperty({
		description: 'Social id',
		example: '1234567890'
	})
	@IsString({
		message: 'Social id must be a string'
	})
	socialId: string
}
export class AuthUser {
	@ApiProperty({
		description: 'User id',
		example: 1
	})
	@IsString({
		message: 'User id must be a number'
	})
	id: number

	@ApiProperty({
		description: 'User email',
		example: 'test@gmail.com'
	})
	@IsEmail()
	email: string
	@ApiProperty({
		description: 'User role',
		example: 'user',
		enum: Role
	})
	@IsEnum(Role)
	role: keyof typeof Role
}

export class RefreshDto {
	@ApiProperty({
		description: 'Refresh token',
		example: '1234567890'
	})
	@IsString({
		message: 'Refresh token must be a string'
	})
	refreshToken: string
}

export class AuthDto {
	@ApiProperty({
		description: 'User email',
		example: 'test@gmail.com'
	})
	@IsEmail()
	email: string

	@ApiProperty({
		description: 'User password',
		example: 'password'
	})
	@MinLength(8)
	password: string
}
