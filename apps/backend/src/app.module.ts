import { CacheModule } from '@nestjs/cache-manager'
import { Module, type MiddlewareConsumer } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'
import { CatalogModule } from './catalog/catalog.module'
import { GenreModule } from './genre/genre.module'
import { ParserModule } from './parser/parser.module'
import { RecommendationModule } from './recommendation/recommendation.module'
import { ReviewModule } from './review/review.module'
import { StorageModule } from './storage/storage.module'
import { UserModule } from './user/user.module'
import { AppLoggerMiddleware } from './utils/helpers/logger'
import { ActivityModule } from './utils/services/activity/activity.module'

@Module({
	imports: [
		UserModule,
		CatalogModule,
		GenreModule,
		BookModule,
		AuthModule,
		StorageModule,
		ParserModule,
		ActivityModule,
		ThrottlerModule.forRoot([
			{
				ttl: 60,
				limit: 10
			}
		]),
		CacheModule.register({
			isGlobal: true,
			ttl: 60,
			max: 100
		}),
		ReviewModule,
		RecommendationModule
	],
	controllers: [AppController],
	providers: [AppService, ConfigService]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AppLoggerMiddleware).forRoutes('*')
	}
}
