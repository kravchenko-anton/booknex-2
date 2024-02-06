import type { AuthPayload } from 'global/services-types/auth-types'

export type IAuthState = Pick<AuthPayload['user'], 'email' | 'id' | 'role'>

export interface TokensType {
	accessToken: string
	refreshToken: string
}

export type AuthResponseType = AuthPayload
