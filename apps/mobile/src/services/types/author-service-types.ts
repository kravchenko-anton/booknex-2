import type { ShortBookType } from '@/services/types/book-service-types'
import type { DefaultModelFields } from '@/types/global'

export interface AuthorType extends DefaultModelFields {
	books: ShortBookType[],
	color: string,
	description: string
	name: string,
	picture: string
}

export type ShortAuthorType = Pick<
	AuthorType,
	'name' | 'id' | 'createdAt' | 'updatedAt'
>
