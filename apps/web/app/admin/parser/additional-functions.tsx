interface SearchParametersProperties {
	title: string
	description: string
	pages: number
	popularity: number
	genres: string[]
}

export const searchParameters = (
	author: { id: number; name: string },
	properties: SearchParametersProperties
) =>
	new URLSearchParams({
		defaultValues: JSON.stringify({
			author: {
				id: author.id,
				name: author.name
			},
			title: properties.title,
			description: properties.description,
			pages: properties.pages,
			popularity: properties.popularity,
			genres: properties.genres
		})
	}).toString()
