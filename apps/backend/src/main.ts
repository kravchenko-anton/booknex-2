import { ZodValidationPipe } from '@anatine/zod-nestjs'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder } from '@nestjs/swagger'
import helmet from 'helmet'
import { OpenApiNestFactory } from 'nest-openapi-tools'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('/api')
	app.enableCors({})
	app.useGlobalPipes(new ZodValidationPipe())
	app.use(helmet())
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
			.addTag('user', 'user service')
			.addTag('auth', 'auth service')
			.addTag('admin', 'admin service')
			.addTag('book', 'book service')
			.addTag('collection', 'collection service')
			.addTag('catalog', 'catalog service')
			.addTag('genre', 'genre service')
			.addTag('storage', 'storage service')
			.addTag('review', 'review service')
			.addTag('recommendation', 'recommendation service')
			.addTag('parser', 'parser service')
			.addBearerAuth(),
		{
			webServerOptions: {
				enabled: true,
				path: 'api-docs'
			},
			fileGeneratorOptions: {
				enabled: true,
				outputFilePath: './openapi.yaml' // or ./openapi.json
			},
			clientGeneratorOptions: {
				enabled: true,
				type: 'typescript-axios',
				outputFolderPath: './libs/global/api-client',
				additionalProperties:
					'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
				openApiFilePath: './openapi.yaml'
			}
		}
	)

	await app.listen(7777)
}

bootstrap() // eslint-disable-line unicorn/prefer-top-level-await
