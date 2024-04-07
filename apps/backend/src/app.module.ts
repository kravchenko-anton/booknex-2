import { CacheModule } from '@nestjs/cache-manager'
import { Module, type MiddlewareConsumer } from '@nestjs/common'
import { ThrottlerModule } from '@nestjs/throttler'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'
import { EbookModule } from './book/ebook/ebook.module'
import { CatalogModule } from './catalog/catalog.module'
import { GenreModule } from './genre/genre.module'
import { HealthModule } from './health/health.module'

import { ParserModule } from './parser/parser.module'
import { RecommendationModule } from './recommendation/recommendation.module'
import { ReviewModule } from './review/review.module'
import { StorageModule } from './storage/storage.module'
import { UserModule } from './user/user.module'
import { AppLoggerMiddleware } from './utils/logger/logger'
import {ActivityModule} from "@/src/activity/activity.module";
import { ConfigModule } from '@nestjs/config';
import {envConfigSchema} from "@/src/utils/config/env-config";
@Module({
	imports: [
		UserModule,
		CatalogModule,
		ConfigModule.forRoot({
			isGlobal: true,
			validate: (config) => envConfigSchema.parse(config)
		}),
		GenreModule,
		BookModule,
		AuthModule,
		StorageModule,
		ParserModule,
		ActivityModule,
		CacheModule.register({
			isGlobal: true,
			max: 1000,
			ttl: 60
		}),
		ThrottlerModule.forRoot([
			{
				ttl: 60,
				limit: 10
			}
		]),
		ReviewModule,
		RecommendationModule,
		HealthModule,
		EbookModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AppLoggerMiddleware).forRoutes('*')
	}
}
