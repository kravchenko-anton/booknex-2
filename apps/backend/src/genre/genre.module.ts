import { Module } from '@nestjs/common'
import { ActivityService } from '../activity/activity.service'
import { PrismaService } from '../utils/prisma.service'

import { GenreController } from './genre.controller'
import { GenreService } from './genre.service'

@Module({
	controllers: [GenreController],
	providers: [GenreService, PrismaService, ActivityService]
})
export class GenreModule {}
