import type { BookCardProperties } from '@/ui/book-card/types'

export const settings: {
	width: Record<BookCardProperties['size'], number>
	height: Record<BookCardProperties['size'], number>
} = {
	width: {
		sm: 120,
		md: 150,
		lg: 190
	},
	height: {
		sm: 160,
		md: 220,
		lg: 260
	}
}
