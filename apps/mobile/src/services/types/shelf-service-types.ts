import type { BookType, ShortBookType } from '@/services/types/book-service-types'
import type { DefaultModelFields } from '@/types/global'

export interface ShelfType extends DefaultModelFields {
	books: (ShortBookType &
		Pick<BookType, 'description' | 'pages' | 'likedPercentage'>)[]
	color: string
	description: string
	picture: string
	title: string
}

export type ShortShelfType = Omit<ShelfType, 'books'>

export type ShelfManipulationType = Omit<ShelfType, 'books' | 'color'>
