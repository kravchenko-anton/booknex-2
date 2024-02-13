import type { RoleType } from '../../../apps/backend/src/auth/auth.service'

export interface AuthPayload extends TokensType {
	user: {
		id: number
		email: string
		role: RoleType
	}
}

export interface TokensType {
	accessToken: string
	refreshToken: string
}

export interface UserType {
	id: number
	createdAt: Date
	updatedAt: Date
	email: string
	name: string
	picture: string
}

export interface AuthFieldsType extends Pick<UserType, 'email'> {
	password: string
}

export type IAuthState = Pick<UserType, 'email' | 'id'>

export interface TokensType {
	accessToken: string
	refreshToken: string
}

export interface AuthResponseType extends TokensType {
	user: Pick<UserType, 'id' | 'email'> & {
		role: RoleType
	}
}
export type googleAuthResponseType = AuthPayload & {
	type: 'register' | 'login'
}
