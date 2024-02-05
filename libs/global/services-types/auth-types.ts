export interface AuthPayload {
	accessToken: string
	refreshToken: string
	user: {
		id: number
		email: string
		role: 'USER' | 'ADMIN'
	}
}
