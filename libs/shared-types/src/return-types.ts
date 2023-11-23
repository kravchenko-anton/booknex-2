export interface DefaultReturnType {
	id: number
}

export interface BookReturnType extends DefaultReturnType {
	title: string,
	picture: string,
}

export interface BookReturnTypeWithAuthor extends BookReturnType {
	author: {
		name: string
	}
}

export interface AuthorReturnType extends DefaultReturnType {
  name: string
}

export interface GenreReturnType extends DefaultReturnType {
	name: string
}


export interface ReviewReturnType extends DefaultReturnType {
	text: string,
	tags: string[]
}
