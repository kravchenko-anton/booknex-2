import type { ComponentType } from 'react'
import type { UserLibraryCategoryType } from '../../../../backend/src/user/user.types'

export type TypeRootStackParameterList = {
	Author: { id: number }

	Book: { id: number }
	ComprehensiveList: {
		type: keyof UserLibraryCategoryType
	}
	Featured: null

	Genre: { id: number }
	Library: null
	Login: null
	Registration: { selectGenres: string[] }
	CheckEmail: null
	EnterField: {
		selectGenres: string[]
	}
	SelectGenres: null
	Profile: null
	Reader: { id: number }
	Explore: null
	Search: null
	Settings: null
	Collection: { id: number }
	Welcome: null
}

export interface IRoute {
	component: ComponentType
	name: keyof TypeRootStackParameterList
}
