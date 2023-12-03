import type { AuthPayload } from '../../../../libs/global/services-types/auth-types'

export interface AuthFieldsType {
	email: string
	password: string
}

export interface RegisterFieldsType extends AuthFieldsType {
	genres: string[]
	name?: string
}

export type IAuthState = Pick<AuthPayload['user'], 'email' | 'id'>

export interface TokensType {
	accessToken: string
	refreshToken: string
}

export type AuthResponseType = AuthPayload
