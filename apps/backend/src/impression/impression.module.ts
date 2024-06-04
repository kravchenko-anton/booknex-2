import { ActivityService } from '@/src/activity/activity.service'
import { Module } from '@nestjs/common'
import { PrismaService } from '../utils/services/prisma.service'
import { ImpressionController } from './impression.controller'
import { ImpressionService } from './impression.service'

@Module({
	controllers: [ImpressionController],
	providers: [ImpressionService, PrismaService, ActivityService]
})
export class ImpressionModule {}
