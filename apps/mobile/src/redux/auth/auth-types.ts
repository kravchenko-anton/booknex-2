interface DefaultModelFields {
	createdAt: string
	id: number
	updatedAt: string
}

interface UserType extends DefaultModelFields {
	email: string
	name: string
	picture: string
}

export interface AuthFieldsType extends Pick<UserType, 'email'> {
	password: string
}

export interface RegisterFieldsType extends AuthFieldsType {
	genres: string[]
	name?: string
}

export type IAuthState = Pick<UserType, 'email' | 'id'>

export interface TokensType {
	accessToken: string
	refreshToken: string
}

export interface AuthResponseType extends TokensType {
	user: Pick<UserType, 'id' | 'email'>
}
