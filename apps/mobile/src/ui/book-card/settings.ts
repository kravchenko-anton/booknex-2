import type { BookCardProperties } from '@/ui/book-card/types'

export const settings: {
	width: Record<BookCardProperties['size'], number>
	height: Record<BookCardProperties['size'], number>
} = {
	width: {
		sm: 120,
		md: 160,
		lg: 190
	},
	height: {
		sm: 180,
		md: 240,
		lg: 260
	}
}
