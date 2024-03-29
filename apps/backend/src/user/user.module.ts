import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService, ActivityService],
	exports: [UserService],
	imports: [ConfigModule]
})
export class UserModule {}
