import { ActivityService } from '@/src/activity/activity.service'
import { Module } from '@nestjs/common'
import { StorageService } from '../storage/storage.service'
import { PrismaService } from '../utils/services/prisma.service'
import { BookController } from './book.controller'
import { BookService } from './book.service'

@Module({
	controllers: [BookController],
	providers: [BookService, PrismaService, StorageService, ActivityService],
	exports: [BookService]
})
export class BookModule {}
