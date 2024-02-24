import { Module } from '@nestjs/common'
import { GenreService } from '../genre/genre.service'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import { BookController } from './book.controller'
import { BookService } from './book.service'

@Module({
	controllers: [BookController],
	providers: [BookService, PrismaService, ActivityService, GenreService],
	exports: [BookService]
})
export class BookModule {}
