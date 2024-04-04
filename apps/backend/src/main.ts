import { ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { SwaggerModule } from '@nestjs/swagger'
import * as Sentry from '@sentry/node'
import { json } from 'express'
import fs from 'fs'
import helmet from 'helmet'
import openapiTS, { astToString } from 'openapi-typescript'
import * as path from 'path'
import { AppModule } from './app.module'
import { checkEnvironmentSet } from './utils/common/check-environment-set'
import environment from './utils/common/environment.config'
import { HttpExceptionFilter } from './utils/common/http-exception.filter'
import { openApiConfig } from './utils/common/open-api.config'
import { SentryFilter } from './utils/common/sentry'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const { httpAdapter } = app.get(HttpAdapterHost)
	app.setGlobalPrefix('/api')
	app.useGlobalFilters(new HttpExceptionFilter())
	app.enableCors({})
	app.use(helmet())

	app.useGlobalPipes(
		new ValidationPipe({
			stopAtFirstError: true
		})
	)
	app.use(json({ limit: '10mb' })) // For load ebook

	const document = SwaggerModule.createDocument(app, openApiConfig)
	SwaggerModule.setup('api', app, document)

	Sentry.init({
		dsn: environment.SENTRY_DSN,
		environment: environment.NODE_ENV
	}) // Sentry configuration
	app.useGlobalFilters(new SentryFilter(httpAdapter))

	checkEnvironmentSet()
	await app.listen(environment.PORT)

	const ast = await openapiTS(
		new URL(`http://localhost:${environment.PORT}/api-yaml`, import.meta.url)
	)
	const contents = astToString(ast)

	if (environment.NODE_ENV === 'development') {
		try {
			const directoryPath = '.\\libs\\global\\api-client'
			const filename = 'schema.d.ts'
			const filePath = path.join(directoryPath, filename)
			// check file exist and if exist rewrite
			if (!fs.existsSync(directoryPath)) {
				fs.mkdirSync(directoryPath, { recursive: true })
			}
			fs.writeFileSync(filePath, contents)
			console.log('👍 api-client file written successfully to', filePath)
		} catch (e) {
			console.error("Can't write api-client file", e)
		}
	}
}

bootstrap() // eslint-disable-line unicorn/prefer-top-level-await
