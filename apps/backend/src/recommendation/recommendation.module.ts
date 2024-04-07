import { Module } from '@nestjs/common'
import { PrismaService } from '../utils/services/prisma.service'
import { RecommendationController } from './recommendation.controller'
import { RecommendationService } from './recommendation.service'
import {ActivityService} from "@/src/activity/activity.service";

@Module({
	controllers: [RecommendationController],
	providers: [RecommendationService, PrismaService, ActivityService]
})
export class RecommendationModule {}
