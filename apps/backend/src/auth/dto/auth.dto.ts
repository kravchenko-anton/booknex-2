import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { Type } from 'class-transformer'
import {
	IsEmail,
	IsEnum,
	IsObject,
	IsString,
	MinLength,
	ValidateNested
} from 'class-validator'

export class SignDto {
	@ApiProperty({
		description: 'Social id',
		example: '1234567890'
	})
	@IsString()
	socialId: string
}
export class AuthUserDto {
	@ApiProperty({
		description: 'User id',
		example: 1
	})
	@IsString()
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
	@IsString()
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

export class AuthResponseDto {
	@ApiProperty({
		description: 'Access token',
		example: '1234567890'
	})
	@IsString()
	accessToken: string
	@ApiProperty({
		description: 'Refresh token',
		example: '1234567890'
	})
	@IsString()
	refreshToken: string
	@ApiProperty({
		description: 'type of auth',
		example: 'login'
	})
	@IsString()
	type?: string

	@ApiProperty({
		type: AuthUserDto,
		description: 'User data'
	})
	@IsObject()
	@ValidateNested()
	@Type(() => AuthUserDto)
	user: AuthUserDto
}
