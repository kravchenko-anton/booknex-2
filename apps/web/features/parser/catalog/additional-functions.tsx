import type { SearchParametersProperties } from '@/features/parser/catalog/types'

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
