/* eslint-disable */
import { z } from 'zod';
export const envConfigSchema = z.object({
    JWT_SECRET: z.string(),
    AWS_REGION: z.string(),
    AWS_BUCKET: z.string(),
    AWS_ENDPOINT: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    DATABASE_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    NODE_ENV: z.string(),
    SENTRY_DSN: z.string(),
    MAX_UPLOAD_SIZE: z.string().transform(v => parseInt(v)),
    PORT: z.string().transform(v => parseInt(v)),
    SERVER_URL: z.string(),
    STORAGE_URL: z.string()
});
//# sourceMappingURL=env-config.js.map