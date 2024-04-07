import { Module } from '@nestjs/common'
import { GenreService } from '../genre/genre.service'
import { RecommendationService } from '../recommendation/recommendation.service'
import { PrismaService } from '../utils/services/prisma.service'
import { CatalogController } from './catalog.controller'
import { CatalogService } from './catalog.service'
import {ActivityService} from "@/src/activity/activity.service";

@Module({
	controllers: [CatalogController],
	providers: [
		CatalogService,
		PrismaService,
		ActivityService,
		GenreService,
		RecommendationService
	]
})
export class CatalogModule {}
