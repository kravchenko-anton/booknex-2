import type { AuthPayload } from 'global/services-types/auth-types'

interface DefaultModelFieldsType {
	createdAt: string
	id: number
	updatedAt: string
}

export interface UserType extends DefaultModelFieldsType {
	email: string
	name: string
	picture: string
}

export interface AuthFieldsType extends Pick<UserType, 'email'> {
	password: string
}

export interface RegisterFieldsType extends AuthFieldsType {
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
export type googleAuthResponseType = AuthPayload & {
	type: 'register' | 'login'
}
