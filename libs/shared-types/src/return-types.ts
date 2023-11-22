export interface DefaultReturnType {
	id: number
}

export interface BookReturnType extends DefaultReturnType {
	title: string,
	picture: string,
	likedPercentage: number
}

export interface BookReturnTypeWithAuthor extends BookReturnType {
	title: string,
	picture: string,
	likedPercentage: number,
	author: {
		name: string
	}
}

export interface AuthorReturnType extends DefaultReturnType {
  name: string
  picture: string
  description: string
  books: BookReturnType[]
}
