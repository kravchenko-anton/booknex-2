import type { AuthorReturnType, BookReturnTypeWithAuthor, DefaultReturnType } from './return-types'

export type AllGenreOutput = (DefaultReturnType & {
	name:string,
	color: string
})[]

 export type GenreByIdOutput = DefaultReturnType & {
	name: string,
	color: string,
	similar: {
		id: true
	}[]
	newestBooks: BookReturnTypeWithAuthor[],
	bestSellers:BookReturnTypeWithAuthor[],
	bestSellersFromSimilar: (DefaultReturnType & {
		name: string,
		majorBooks: BookReturnTypeWithAuthor[]
	})[],
	bestAuthors: AuthorReturnType[]
}
