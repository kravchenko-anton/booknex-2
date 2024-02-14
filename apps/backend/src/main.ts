import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('/api')
	app.enableCors({})
	app.useGlobalPipes(new ValidationPipe())
	app.use(helmet())
	const config = new DocumentBuilder()
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
		.addTag('parser', 'parser service')
		.addBearerAuth()
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api-docs', app, document, {})
	await app.listen(7777)
}

bootstrap() // eslint-disable-line unicorn/prefer-top-level-await
