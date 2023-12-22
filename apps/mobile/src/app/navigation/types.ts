import type { ComponentType } from 'react'

export type  UserLibraryFieldsType = 'books' | 'shelves'
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
}

export interface IRoute {
	component: ComponentType
	name: keyof TypeRootStackParameterList
}
