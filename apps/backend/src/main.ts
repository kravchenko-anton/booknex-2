import { ZodValidationPipe } from '@anatine/zod-nestjs'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import { json } from 'express'
import helmet from 'helmet'
import { OpenApiNestFactory } from 'nest-openapi-tools'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './utils/common/http-exception.filter'
import { SentryFilter } from './utils/common/sentry'
import {
	openApiConfig,
	typesGeneratorConfig
} from './utils/config/open-api.config'

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
		dsn: process.env.SENTRY_DSN,
		environment: process.env.NODE_ENV || 'development'
	}) // Sentry configuration
	app.useGlobalFilters(new SentryFilter(httpAdapter))
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

	await app.listen(process.env.PORT || 3000)
}
// if been "Eror: Could not load the sharp modile using the win32-x64 runtime"
// run yarn add sharp --ignore-engines

bootstrap()
// eslint-disable-line unicorn/prefer-top-level-await
