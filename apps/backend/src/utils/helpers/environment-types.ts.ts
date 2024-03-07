/* eslint @typescript-eslint/naming-convention: 0 */ // --> OFF because of  the environment variables

export interface EnvironmentType {
	JWT_SECRET: string
	DATABASE_URL: string
	GOOGLE_CLIENT_ID: string
	UPLOAD_DIR: string
	GOOGLE_CLIENT_SECRET: string
	NODE_ENV: string
}
