import { Module } from '@nestjs/common'
import { PrismaService } from '../../utils/services/prisma.service'
import { EbookController } from './ebook.controller'
import { EbookService } from './ebook.service'
import {ActivityService} from "@/src/activity/activity.service";

@Module({
	controllers: [EbookController],
	providers: [EbookService, PrismaService, ActivityService]
})
export class EbookModule {}
