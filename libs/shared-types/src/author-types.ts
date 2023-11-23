import type { AuthorReturnType, BookReturnType } from './return-types'


export interface InfoByIdOutput extends AuthorReturnType {
	picture: string;
	description: string;
	color: string;
	books: BookReturnType[];
}

export type AllAuthorOutput = {
  id: number
  name: string
  picture: string
  description: string
}[]

export interface CreateAuthorPayload {
	name: string
	picture: string
	description: string
	books: number[]
}

export interface EditAuthorPayload {
	name?: string
	picture?: string
	description?: string
	books?: number[]
}

