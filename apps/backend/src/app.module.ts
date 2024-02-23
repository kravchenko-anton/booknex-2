import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
import { LoggerModule } from 'nestjs-pino'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { BookModule } from './book/book.module'
import { CatalogModule } from './catalog/catalog.module'
import { GenreModule } from './genre/genre.module'
import { ParserModule } from './parser/parser.module'
import { StorageModule } from './storage/storage.module'
import { UserModule } from './user/user.module'
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
		LoggerModule.forRoot({
			pinoHttp: {
				transport: {
					target: 'pino-pretty',
					options: {
						colorize: true,
						translateTime: 'SYS:standard',
						ignore:
							'pid,hostname,reqId,level,context,scope,req,req-headers,res,res-headers,hostname,remoteAddress,remotePort,req.remoteAddress',
						messageFormat: '{msg} {req.method} {req.url} {res.statusCode}'
					}
				}
			}
		}),
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
