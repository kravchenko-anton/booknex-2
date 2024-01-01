import type { ComponentType } from 'react'
import type { UserLibraryCategoryType } from '../../../../backend/src/user/user.types'

export type TypeRootStackParameterList = {
	Author: { id: number }

	Book: { id: number }
	ComprehensiveList: {
		type: keyof UserLibraryCategoryType
	}
	Featured: undefined

	Genre: { id: number }
	Library: undefined
	Login: undefined
	Registration: { selectGenres: string[] }
	CheckEmail: undefined
	EnterField: {
		selectGenres: string[]
	}
	SelectGenres: undefined
	Profile: undefined
	Reader: { id: number }
	Explore: undefined
	Search: undefined
	Settings: undefined
	Collection: { id: number }
	UpdateProfile: undefined
	Welcome: undefined
}

export interface IRoute {
	component: ComponentType
	name: keyof TypeRootStackParameterList
}
