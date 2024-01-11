import type { UserUpdatePasswordPayload } from '@booknex/global/services-types/user-types'
import { MinLength } from 'class-validator'

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

export class UserUpdateSelectedGenresDto {
	selectedGenres: number[]
}
