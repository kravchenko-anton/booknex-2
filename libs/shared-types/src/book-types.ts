import type { Prisma } from '@prisma/client'
import type { AuthorReturnType, BookReturnType, GenreReturnType } from './return-types'

export type EmotionOutput = {
 name: string,
	path: string
} []

export interface ReviewBookPayload {
	emotion: string
	tags: string[]
	comment: string
}

export interface BookByIdOutput {
	id: number
	title: string
	picture: string
	author: AuthorReturnType
	genres: GenreReturnType[]
	description: string
	similarBooks: BookReturnType[]
}

export interface CreateBookPayload {
	title: string;
	author: {
		name: string;
	};
	description: string;
	picture: string;
file: string
charapters: {
	name: string
	link: string
}[]
	pages: number;
	likedPercentage: number;
	popularity: number;
	majorGenre: string;
	genres: string[];
}

export interface EditBookPayload {
	title?: string;
	author?: string;
	description?: string;
	picture?: string;
	file?: string
	charapters?: {
		name: string
		link: string
	}[]
	pages?: number;
	likedPercentage?: number;
	popularity?: number;
	majorGenre?: string;
	genres?: string[];
}


export interface GetEbpubOutput {
	charapters: Prisma.JsonArray // TODO: добавить сюда типизацию
	file: string
}
