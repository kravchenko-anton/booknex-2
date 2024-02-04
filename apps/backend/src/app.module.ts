import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { AdminModule } from './admin/admin.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthGoogleModule } from './auth-google/auth-google.module'
import { BookModule } from './book/book.module'
import { CatalogModule } from './catalog/catalog.module'
import { CollectionModule } from './collection/collection.module'
import { GenreModule } from './genre/genre.module'
import { ParserModule } from './parser/parser.module'
import { StorageModule } from './storage/storage.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		UserModule,
		CatalogModule,
		GenreModule,
		BookModule,
		StorageModule,
		AuthGoogleModule,
		CollectionModule,
		ParserModule,
		AdminModule,
		ThrottlerModule.forRoot([
			{
				ttl: 60,
				limit: 10
			}
		]),
		CacheModule.register({
			isGlobal: true,
			ttl: 5000,
			max: 1000
		})
	],
	controllers: [AppController],
	providers: [AppService, ConfigService]
})
export class AppModule {}
