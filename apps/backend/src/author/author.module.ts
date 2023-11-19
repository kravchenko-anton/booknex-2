import { Module } from '@nestjs/common'
import { PrismaService } from '../utils/prisma.service'
import { AuthorController } from './author.controller'
import { AuthorService } from './author.service'

@Module({
	controllers: [AuthorController],
	providers: [AuthorService, PrismaService]
})
export class AuthorModule {}
