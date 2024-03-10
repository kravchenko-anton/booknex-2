import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import { json } from 'express'
import helmet from 'helmet'
import { OpenApiNestFactory } from 'nest-openapi-tools'
import { AppModule } from './app.module'
import { checkEnvironmentSet } from './utils/common/check-environment-set'
import environment from './utils/common/environment.config'
import {
	openApiConfig,
	openApiSwaggerConfig
} from './utils/common/open-api.config'
import { SentryFilter } from './utils/common/sentry'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const { httpAdapter } = app.get(HttpAdapterHost)
	app.setGlobalPrefix('/api')
	app.enableCors({})
	app.use(helmet())

	app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))
	app.use(json({ limit: '10mb' })) // For load ebook

	await OpenApiNestFactory.configure(app, openApiConfig, openApiSwaggerConfig)
	Sentry.init({
		dsn: environment.SENTRY_DSN,
		environment: environment.NODE_ENV
	}) // Sentry configuration
	app.useGlobalFilters(new SentryFilter(httpAdapter))

	checkEnvironmentSet()
	await app.listen(environment.PORT)
}

bootstrap() // eslint-disable-line unicorn/prefer-top-level-await
