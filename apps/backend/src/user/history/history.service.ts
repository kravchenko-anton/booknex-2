import type { History } from '@/src/user/history/history.model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class HistoryService {
	// constructor(private readonly prisma: PrismaService) {}
	//TODO: Implement sync method in HistoryService
	async sync(body: History, userId: number) {
		// await prisma?.readingHistory.create({})

		return {
			...body,
			userId
		}
	}
}
