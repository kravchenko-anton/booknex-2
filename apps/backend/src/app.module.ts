import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { ActivityModule } from './activity/activity.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BookModule } from './book/book.module'

@Module({
	imports: [
		BookModule,
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
		}),
		ActivityModule
	],
	controllers: [AppController],
	providers: [AppService, ConfigService]
})
export class AppModule {}
