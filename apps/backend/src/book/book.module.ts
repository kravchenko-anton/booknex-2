import { Module } from '@nestjs/common'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import { BookController } from './book.controller'
import { BookService } from './book.service'

@Module({
	controllers: [BookController],
	providers: [BookService, PrismaService, ActivityService],
	exports: [BookService]
})
export class BookModule {}
