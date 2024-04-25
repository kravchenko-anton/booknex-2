import { PrismaService } from '@/src/utils/services/prisma.service'
import { Module } from '@nestjs/common'
import { HistoryController } from './history.controller'
import { HistoryService } from './history.service'

@Module({
	controllers: [HistoryController],
	providers: [HistoryService, PrismaService]
})
export class HistoryModule {}
