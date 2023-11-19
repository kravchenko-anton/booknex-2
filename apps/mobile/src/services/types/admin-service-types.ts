import type { ShortBookType } from '@/services/types/book-service-types'

export interface StatisticsType {
	mostReadBook: ShortBookType[],
	totalReadTime: number
	totalUsers: number
}
