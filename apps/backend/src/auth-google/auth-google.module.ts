import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../utils/prisma.service'
import { AuthGoogleController } from './auth-google.controller'
import { AuthGoogleService } from './auth-google.service'

@Module({
	imports: [ConfigModule],
	providers: [AuthGoogleService, PrismaService, JwtService],
	exports: [AuthGoogleService],
	controllers: [AuthGoogleController]
})
export class AuthGoogleModule {}
