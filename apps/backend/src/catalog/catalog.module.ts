import { Module } from '@nestjs/common'
import { ActivityService } from '../activity/activity.service'
import { BookService } from '../book/book.service'
import { GenreService } from '../genre/genre.service'
import { PrismaService } from '../utils/prisma.service'
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
