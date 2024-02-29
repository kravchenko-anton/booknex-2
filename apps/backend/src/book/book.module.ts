import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GenreService } from '../genre/genre.service'
import { StorageService } from '../storage/storage.service'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import { BookController } from './book.controller'
import { BookService } from './book.service'

@Module({
	controllers: [BookController],
	providers: [
		BookService,
		PrismaService,
		StorageService,
		ConfigService,
		ActivityService,
		GenreService
	],
	exports: [BookService]
})
export class BookModule {}
