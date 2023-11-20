import type { UserLibraryFieldsType } from '@/services/types/user-services-types'
import type { ComponentType } from 'react'

export type TypeRootStackParameterList = {
	Author: { id: number }

	Book: { id: number }
	ComprehensiveList: {
		type: keyof UserLibraryFieldsType
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
	Reading: { id: number; epub: string }
	Search: undefined
	Settings: undefined

	Shelf: { id: number }
	UpdateProfile: undefined
	Welcome: undefined

	// Admin
	Statistic: undefined
	BookList: undefined
}

export interface IRoute {
	component: ComponentType
	isAdmin?: boolean
	name: keyof TypeRootStackParameterList
}
