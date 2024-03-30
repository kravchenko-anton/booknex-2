/* eslint-disable @typescript-eslint/naming-convention */

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
	SENTRY_DSN: string
	NODE_ENV: string
	MAX_UPLOAD_SIZE: number
	PORT: string
}

export default {
	JWT_SECRET: process.env.JWT_SECRET || 'have good day',
	AWS_REGION: process.env.AWS_REGION || '',
	AWS_BUCKET: process.env.AWS_BUCKET || '',
	AWS_ENDPOINT: process.env.AWS_ENDPOINT || '',
	AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || '',
	AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || '',
	DATABASE_URL: process.env.DATABASE_URL || '',
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
	NODE_ENV: process.env.NODE_ENV || 'development',
	SENTRY_DSN: process.env.SENTRY_DSN || '',
	MAX_UPLOAD_SIZE: process.env.MAX_UPLOAD_SIZE || 1024 * 1024 * 5,
	PORT: process.env.PORT || '7777'
} as EnvironmentType
