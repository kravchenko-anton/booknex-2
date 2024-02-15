import { Module } from '@nestjs/common'
import { ActivityService } from '../activity/activity.service'
import { PrismaService } from '../utils/prisma.service'
import { CollectionController } from './collection.controller'
import { CollectionService } from './collection.service'

@Module({
	controllers: [CollectionController],
	providers: [CollectionService, PrismaService, ActivityService]
})
export class CollectionModule {}
