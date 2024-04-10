import zod from 'zod'

const envSchema = zod.object({
	CLIENT_ID: zod.string().min(5),
	SERVER_URL: zod.string().min(5)
})

export const env = envSchema.parse({
	CLIENT_ID: process.env['CLIENT_ID'],
	SERVER_URL: process.env['SERVER_URL']
})
