/* eslint @typescript-eslint/naming-convention: 0 */ // --> OFF because of  the environment variables

export interface EnvironmentType {
	JWT_SECRET: string
	AWS_REGION: string
	AWS_BUCKET: string
	AWS_ENDPOINT: string
	AWS_ACCESS_KEY_ID: string
	AWS_SECRET_ACCESS_KEY: string
	DATABASE_URL: string
	GOOGLE_CLIENT_ID: string
	GOOGLE_CLIENT_SECRET: string
	NODE_ENV: string
}
