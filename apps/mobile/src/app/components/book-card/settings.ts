import type { BookCardProperties } from '@/components/book-card/types'

export const settings: {
	width: Record<BookCardProperties['size'], number>
	height: Record<BookCardProperties['size'], number>
} = {
	width: {
		sm: 160,
		md: 180,
		lg: 190
	},
	height: {
		sm: 220,
		md: 250,
		lg: 260
	}
}
