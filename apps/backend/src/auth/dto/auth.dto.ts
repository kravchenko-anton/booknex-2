import { IsString } from 'class-validator'

export class SignDto {
	@IsString()
	socialId: string
}

export class RefreshDto {
	@IsString()
	refreshToken: string
}
