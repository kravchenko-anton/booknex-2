import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService, PrismaService],
  exports: [ActivityService]
})
export class ActivityModule {}
