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
import { HealthModule } from './health/health.module'
import { ParserModule } from './parser/parser.module'
import { RecommendationModule } from './recommendation/recommendation.module'
import { ReviewModule } from './review/review.module'
import { StorageModule } from './storage/storage.module'
import { UserModule } from './user/user.module'
import { AppLoggerMiddleware } from './utils/helpers/logger'
import { ActivityModule } from './utils/services/activity/activity.module'
import { EbookModule } from './ebook/ebook.module';

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
	providers: [AppService, ConfigService]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AppLoggerMiddleware).forRoutes('*')
	}
}
