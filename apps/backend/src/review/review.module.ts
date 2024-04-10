import { ActivityService } from '@/src/activity/activity.service'
import { Module } from '@nestjs/common'
import { PrismaService } from '../utils/services/prisma.service'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'

@Module({
	controllers: [ReviewController],
	providers: [ReviewService, PrismaService, ActivityService]
})
export class ReviewModule {}
