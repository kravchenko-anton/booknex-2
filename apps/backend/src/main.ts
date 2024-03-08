import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder } from '@nestjs/swagger'
import { json } from 'express'
import helmet from 'helmet'
import { OpenApiNestFactory } from 'nest-openapi-tools'
import { WinstonModule } from 'nest-winston'
import { format, transports } from 'winston'
import { AppModule } from './app.module'
import { checkEnvironmentSet } from './utils/common/check-environment-set'
import environment from './utils/common/environment.config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: WinstonModule.createLogger({
			transports: [
				new transports.Console({
					format: format.combine(
						format.cli(),
						format.splat(),
						format.colorize(),
						format.timestamp(),
						format.printf(
							info => `${info.timestamp} ${info.level}: ${info.message}`
						)
					)
				})
			]
		})
	})
	app.setGlobalPrefix('/api')
	app.enableCors({})
	app.use(helmet())
	app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }))

	app.use(json({ limit: '10mb' }))
	await OpenApiNestFactory.configure(
		app,
		new DocumentBuilder()
			.setTitle('Booknex')
			.setContact(
				'Booknex',
				'https://github.com/kravchenko-anton/booknex-2-monorepo',
				'Github repository'
			)
			.setVersion('1.0')
			.addTag('👤 user', 'user service')
			.addTag('🔐 auth', 'auth service')
			.addTag('📙 book', 'book service')
			.addTag('📚 catalog', 'catalog service')
			.addTag('🔖 genre', 'genre service')
			.addTag('📁 storage', 'storage service')
			.addTag('⭐ review', 'review service')
			.addTag('📨 recommendation', 'recommendation service')
			.addTag('📦 parser', 'parser service')
			.addBearerAuth(),
		{
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
		}
	)

	checkEnvironmentSet()
	await app.listen(environment.PORT)
}

bootstrap() // eslint-disable-line unicorn/prefer-top-level-await
