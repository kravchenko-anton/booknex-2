import { Module } from '@nestjs/common'
import { BookService } from '../book/book.service'
import { GenreService } from '../genre/genre.service'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import { CatalogController } from './catalog.controller'
import { CatalogService } from './catalog.service'

@Module({
	controllers: [CatalogController],
	providers: [
		CatalogService,
		PrismaService,
		ActivityService,
		BookService,
		GenreService
	]
})
export class CatalogModule {}
