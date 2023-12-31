import type { BookCardProperties } from '@/components/book-card/types'

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
		sm: 160,
		md: 230,
		lg: 260
	}
}
