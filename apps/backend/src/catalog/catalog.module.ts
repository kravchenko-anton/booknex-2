import { Module } from '@nestjs/common'
import { ActivityService } from '../activity/activity.service'
import { PrismaService } from '../utils/prisma.service'
import { CatalogController } from './catalog.controller'
import { CatalogService } from './catalog.service'

@Module({
	controllers: [CatalogController],
	providers: [CatalogService, PrismaService, ActivityService]
})
export class CatalogModule {}
