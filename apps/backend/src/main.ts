import { ZodValidationPipe } from '@anatine/zod-nestjs'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import * as Sentry from '@sentry/node'
import { json } from 'express'
import helmet from 'helmet'
import { OpenApiNestFactory } from 'nest-openapi-tools'
import { AppModule } from './app.module'
import { checkEnvironmentSet } from './utils/common/check-environment-set'
import environment from './utils/common/environment.config'
import { HttpExceptionFilter } from './utils/common/http-exception.filter'
import { openApiConfig } from './utils/common/open-api.config'
import { SentryFilter } from './utils/common/sentry'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const { httpAdapter } = app.get(HttpAdapterHost)
	app.useGlobalFilters(new HttpExceptionFilter())
	app.enableCors({})
	app.use(helmet())

	app.useGlobalPipes(new ZodValidationPipe({}))
	app.use(json({ limit: '10mb' })) // For load ebook

	await OpenApiNestFactory.configure(app, openApiConfig, {
		webServerOptions: {
			enabled: environment.NODE_ENV === 'development',
			path: 'api-docs'
		},
		fileGeneratorOptions: {
			enabled: environment.NODE_ENV === 'development',
			outputFilePath: './openapi.yaml' // or ./openapi.json
		},

		clientGeneratorOptions: {
			enabled: environment.NODE_ENV === 'development',
			type: 'typescript-axios',
			outputFolderPath: './libs/global/api-client',
			additionalProperties:
				'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
			openApiFilePath: './openapi.yaml',
			skipValidation: true
		}
	})
	Sentry.init({
		dsn: environment.SENTRY_DSN,
		environment: environment.NODE_ENV
	}) // Sentry configuration
	app.useGlobalFilters(new SentryFilter(httpAdapter))

	checkEnvironmentSet()
	await app.listen(environment.PORT)
}

bootstrap() // eslint-disable-line unicorn/prefer-top-level-await
