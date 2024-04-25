import { ActivityService } from '@/src/activity/activity.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from '../utils/services/prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { HistoryModule } from './history/history.module';

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, ActivityService],
	exports: [UserService],
	imports: [ConfigModule, HistoryModule]
})
export class UserModule {}
