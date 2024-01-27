export interface EditAndUseProperties {
	authorName: string
	authorPicture: string
	authorDescription: string
	description: string
	genres: string[]
	pages: number
	popularity: number
	picture: string
	title: string
	id: number
}

export interface SearchParametersProperties {
	title: string
	description: string
	pages: number
	popularity: number
	genres: string[]
}
