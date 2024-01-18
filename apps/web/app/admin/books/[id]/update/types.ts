export interface DefaultCreateBookValuesType {
	title: string
	pages: number
	popularity: number
	description: string
	author: {
		id: number
		name: string
	}
	genres: {
		id: number
		name: string
	}[]
}
