import { IsEmail, IsOptional, MinLength } from 'class-validator'
import type { UserUpdatePasswordPayload, UserUpdatePayload } from '../../../../../libs/global/services-types/user-types'


export class UserUpdateBioDto implements UserUpdatePayload {
	@IsEmail()
	email: string

	@IsOptional()
	name: string
}

export class UserUpdatePasswordDto implements UserUpdatePasswordPayload {
	@MinLength(8, {
		message: 'Password is too short. Minimal length is characters'
	})
	password: string

	@MinLength(8, {
		message: 'Old Password is too short. Minimal length is characters'
	})
	oldPassword: string
}
