import { DocumentBuilder } from '@nestjs/swagger'
import { appName } from '../../../../../libs/global/utils'

export const openApiConfig = new DocumentBuilder()
	.setTitle(appName)
	.setContact(
		appName,
		'https://github.com/kravchenko-anton/booknex-2-monorepo',
		'Github repository'
	)
	.setVersion('1.0')
	.addTag('👤 user', 'user service')
	.addTag('🔐 auth', 'auth service')
	.addTag('📙 book', 'book service')
	.addTag('📚 catalog', 'catalog service')
	.addTag('❤️ health', 'health service')
	.addTag('🔖 genre', 'genre service')
	.addTag('📁 storage', 'storage service')
	.addTag('⭐ review', 'review service')
	.addTag('📨 recommendation', 'recommendation service')
	.addTag('📦 parser', 'parser service')
	.addBearerAuth()
	.build()
