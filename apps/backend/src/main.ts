import { ZodValidationPipe } from '@anatine/zod-nestjs'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import { json } from 'express'
import helmet from 'helmet'
import { OpenApiNestFactory } from 'nest-openapi-tools'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './utils/common/http-exception.filter'
import {openApiConfig, typesGeneratorConfig} from './utils/config/open-api.config'
import { SentryFilter } from './utils/common/sentry'
async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const { httpAdapter } = app.get(HttpAdapterHost)
	app.useGlobalFilters(new HttpExceptionFilter())
	app.enableCors({})
	app.use(helmet())
	app.useGlobalPipes(new ZodValidationPipe())
	app.use(json({ limit: '10mb' })) // For load ebook

	await OpenApiNestFactory.configure(app, openApiConfig, typesGeneratorConfig)
	Sentry.init({
		dsn: process.env['SENTRY_DSN'],
		environment: process.env['NODE_ENV'] || 'development'
	}) // Sentry configuration
	app.useGlobalFilters(new SentryFilter(httpAdapter))

	await app.listen(process.env["PORT"] || 3000)
}

bootstrap() // eslint-disable-line unicorn/prefer-top-level-await
