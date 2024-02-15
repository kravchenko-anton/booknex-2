import { Module } from '@nestjs/common'
import { PrismaService } from '../utils/prisma.service'
import { ActivityController } from './activity.controller'
import { ActivityService } from './activity.service'

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService],
})
export class ActivityModule {}
