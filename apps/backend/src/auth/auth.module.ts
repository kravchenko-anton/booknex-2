import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { ActivityService } from '../activity/activity.service'
import { getJwtConfig } from '../config/jwt.config'
import { GenreService } from '../genre/genre.service'
import { UserService } from '../user/user.service'
import { PrismaService } from '../utils/prisma.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.stategy'

@Module({
	controllers: [AuthController],
	providers: [
		AuthService,
		PrismaService,
		JwtStrategy,
		UserService,
		GenreService,
		ConfigService,
		ActivityService
	],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	]
})
export class AuthModule {}
