export interface AuthPayload {
	accessToken: string
	refreshToken: string
	user: {
		id: number
		email: string
		isAdmin: boolean
	}
}

export interface RegisterPayload {
	email: string
	password: string
	name: string | null
	genres: string[]
}
