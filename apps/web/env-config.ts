const zod = require('zod')

const envSchema = zod.object({
	CLIENT_ID: zod.string().required()
})

export const env = envSchema.parse({
	CLIENT_ID: process.env.CLIENT_ID
})
