import zod from 'zod'

const envSchema = zod.object({
	CLIENT_ID: zod.string()
})

export const env = envSchema.parse({
	CLIENT_ID: process.env['CLIENT_ID']
})
