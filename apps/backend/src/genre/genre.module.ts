import { ActivityService } from '@/src/activity/activity.service'
import { Module } from '@nestjs/common'
import { PrismaService } from '../utils/services/prisma.service'

import { GenreController } from './genre.controller'
import { GenreService } from './genre.service'

@Module({
	controllers: [GenreController],
	providers: [GenreService, PrismaService, ActivityService],
	exports: [GenreService]
})
export class GenreModule {}
