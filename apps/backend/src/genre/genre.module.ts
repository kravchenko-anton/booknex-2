import { Module } from '@nestjs/common'
import { ActivityService } from '../utils/services/activity/activity.service'
import { PrismaService } from '../utils/services/prisma.service'

import { GenreController } from './genre.controller'
import { GenreService } from './genre.service'

@Module({
	controllers: [GenreController],
	providers: [GenreService, PrismaService, ActivityService],
	exports: [GenreService]
})
export class GenreModule {}
