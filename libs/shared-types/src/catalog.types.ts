import type { BookReturnType, BookReturnTypeWithAuthor, GenreReturnType } from './return-types'

export interface CatalogOutput {
	recommendations: BookReturnType[]
	popularNow: BookReturnTypeWithAuthor[]
	bestSellers: BookReturnTypeWithAuthor[]
	newReleases: BookReturnTypeWithAuthor[]
	sameBreath: BookReturnTypeWithAuthor[]
	genres: {
		name: string
		books: BookReturnTypeWithAuthor[]
	}[]
	mostRelatedGenres: GenreReturnType[]
}

export type SearchExamplesOutput = {
	id: number,
	title: string
}[]


export type SearchOutput = (BookReturnType & {
	likedPercentage: number,
	pages: number
})[]
