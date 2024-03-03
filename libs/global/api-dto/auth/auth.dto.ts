import { IsEmail, MinLength } from 'class-validator'
import type { AuthDto as AuthDtoType } from '../../api-client'

export class AuthDto implements AuthDtoType {
	@IsEmail()
	email: string

	@MinLength(8)
	password: string
}
