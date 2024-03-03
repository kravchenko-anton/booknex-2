import { ApiProperty } from '@nestjs/swagger'
import {
	IsDate,
	IsEmail,
	IsNumber,
	IsOptional,
	IsString
} from 'class-validator'

export class User {
	@ApiProperty({ example: 1, description: 'user id' })
	@IsNumber()
	id: number

	@IsDate()
	@ApiProperty({ example: '2021-07-01', description: 'user created at' })
	createdAt: Date

	@IsString()
	@IsEmail()
	@ApiProperty({ example: 'email', description: 'user email' })
	email: string

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'socialId', description: 'user social id' })
	socialId?: string

	@IsOptional()
	@IsString()
	@ApiProperty({ example: 'password', description: 'user password' })
	password?: string

	@IsString()
	@ApiProperty({ example: 'picture', description: 'user picture' })
	picture: string

	@IsString()
	@ApiProperty({ example: 'fullName', description: 'user full name' })
	fullName: string
	@IsString()
	@ApiProperty({ example: 'location', description: 'user location' })
	location: string
}
