import { PrismaService } from '@/src/utils/services/prisma.service'
import { Module } from '@nestjs/common'
import { ActivityController } from './activity.controller'
import { ActivityService } from './activity.service'

@Module({
	controllers: [ActivityController],
	providers: [ActivityService, PrismaService],
	exports: [ActivityService]
})
export class ActivityModule {}
