import type { RoleType } from '../../../apps/backend/src/auth/auth.service'

export interface AuthPayload {
	accessToken: string
	refreshToken: string
	user: {
		id: number
		email: string
		role: RoleType
	}
}
