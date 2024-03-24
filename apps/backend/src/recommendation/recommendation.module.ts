import { Module } from '@nestjs/common';
import { ActivityService } from '../utils/services/activity/activity.service';
import { PrismaService } from '../utils/services/prisma.service';
import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';

@Module({
  controllers: [RecommendationController],
  providers: [RecommendationService, PrismaService, ActivityService]
})
export class RecommendationModule {}
