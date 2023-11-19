import type { ShortAuthorType } from '@/services/types/author-service-types'
import type { GenreType } from '@/services/types/genre-service-types'
import type { DefaultModelFields } from '@/types/global'

export interface BookType extends DefaultModelFields {
	author: ShortAuthorType,
	color: string,
	description: string
	epub: string,
	genres: Omit<GenreType, 'createdAt' | 'updatedAt'>[],
	likedPercentage: number,
	pages: number,
	picture: string,
	popularity: number
	title: string
}

export type ShortBookType = Pick<
	BookType,
	| 'title'
	| 'author'
	| 'picture'
	| 'likedPercentage'
	| 'id'
	| 'updatedAt'
	| 'createdAt'
>

export interface BookByIdType extends BookType {
	similarBooks: BookType[]
}

export interface ReviewType {
	comment: string,
	emotion: string,
	tags: string[]
}

export interface BookManipulationType {
	author: string,
	description: string,
	epub: string,
	genres: string[],
	image: string,
	likedPercentage: number,
	majorGenre: string,
	pages: number,
	popularity: number,
	title: string
}
