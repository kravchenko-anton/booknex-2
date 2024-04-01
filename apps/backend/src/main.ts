import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import { json } from 'express'
import helmet from 'helmet'
import { OpenApiNestFactory } from 'nest-openapi-tools'
import { AppModule } from './app.module'
import { checkEnvironmentSet } from './utils/common/check-environment-set'
import environment from './utils/common/environment.config'
import { HttpExceptionFilter } from './utils/common/http-exception.filter'
import {
	openApiConfig,
	openApiSwaggerConfig
} from './utils/common/open-api.config'
import { SentryFilter } from './utils/common/sentry'

async function bootstrap() {
	const appV1 = await NestFactory.create(AppModule)
	const { httpAdapter } = appV1.get(HttpAdapterHost)
	appV1.setGlobalPrefix('/api/v1')
	appV1.useGlobalFilters(new HttpExceptionFilter())
	appV1.enableCors({})
	appV1.use(helmet())

	appV1.useGlobalPipes(
		new ValidationPipe({
			stopAtFirstError: true
		})
	)
	appV1.use(json({ limit: '10mb' })) // For load ebook

	await OpenApiNestFactory.configure(appV1, openApiConfig, openApiSwaggerConfig)
	Sentry.init({
		dsn: environment.SENTRY_DSN,
		environment: environment.NODE_ENV
	}) // Sentry configuration
	appV1.useGlobalFilters(new SentryFilter(httpAdapter))

	checkEnvironmentSet()
	await appV1.listen(environment.PORT)
}

bootstrap() // eslint-disable-line unicorn/prefer-top-level-await
