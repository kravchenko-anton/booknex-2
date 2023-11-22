import type { AuthorReturnType, BookReturnType, DefaultReturnType } from './return-types'


export interface InfoByIdOutput extends DefaultReturnType, AuthorReturnType {
	picture: string;
	description: string;
	color: string;
	books: BookReturnType[];
}
