import type { BookType, ShortBookType } from '@/services/types/book-service-types'
import type { GenreType } from '@/services/types/genre-service-types'

interface SameBreathBookType extends ShortBookType {
	pages: number
}

export interface TopSearchersType {
	id: number
	name?: string
	title?: string
}

export interface CatalogType {
	bestSellers: ShortBookType[],
	genres: {
		majorBooks: BookType[],
		name: string
	}[],
	mostRelatedGenres: Pick<
		GenreType,
		'name' | 'createdAt' | 'id' | 'updatedAt'
	>[],
	newReleases: ShortBookType[],
	popularNow: (ShortBookType & { color: string, description: string; })[],
	recommendations: ShortBookType[],
	sameBreath: SameBreathBookType[]
}

export interface SearchBookType extends ShortBookType {
	isbn: string,
	likedPercentage: number,
	pages: number
}
