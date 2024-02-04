import { IsString } from 'class-validator'

export class SignDto {
	@IsString()
	socialId: string

	@IsString({ each: true, message: 'Initial genre in user it require' })
	genres: string[]
}

export class RefreshDto {
	@IsString()
	refreshToken: string
}
