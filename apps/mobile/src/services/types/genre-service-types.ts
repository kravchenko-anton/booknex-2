import type {
	AuthorType,
	ShortAuthorType
} from '@/services/types/author-service-types'
import type { BookType, ShortBookType } from '@/services/types/book-service-types'
import type { DefaultModelFields } from '@/types/global'

export interface GenreType extends DefaultModelFields {
	books: BookType[],
	color: string
	name: string
}

export interface SimilarBestSellersType extends Omit<GenreType, 'books'> {
	majorBooks: ShortBookType[]
}

export interface GenreByIdType extends Omit<GenreType, 'books'> {
	bestAuthors: (ShortAuthorType & Pick<AuthorType, 'picture'>)[],
	bestSellers: ShortBookType[]
	bestSellersFromSimilar: SimilarBestSellersType[]
	newestBooks: Pick<BookType, keyof ShortBookType | 'color' | 'description'>[]
}
