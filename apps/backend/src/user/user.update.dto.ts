import { IsNumber, IsString, MinLength } from 'class-validator'

export class UserUpdatePasswordDto {
	@IsString()
	@MinLength(8, {
		message: 'Password is too short. Minimal length is characters'
	})
	password: string

	@IsString()
	@MinLength(8, {
		message: 'Old Password is too short. Minimal length is characters'
	})
	oldPassword: string
}

export class UserUpdateSelectedGenresDto {
	@IsNumber({}, { each: true })
	@MinLength(1, {
		message: 'At least one genre should be selected'
	})
	selectedGenres: number[]
}
