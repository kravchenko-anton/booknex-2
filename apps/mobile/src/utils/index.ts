import type { ReadingHistoryType } from '@/screens/reading/store/progress-store'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const historyByLatestSorting = (history: ReadingHistoryType[]) =>
	history.sort(
		(a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
	)
