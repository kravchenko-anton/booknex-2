import type { ParamListBase } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ComponentType } from 'react'

export type TypeRootStackParameterList = {
	Book: { id: number }

	Featured: null
	BookFeedback: { id: number }
	Genre: { id: number; name: string }
	Library: null
	Login: null
	Registration: { selectGenres: string[] }
	SelectGenres: null
	Profile: null
	Reader: { id: number }
	Search: null
	Settings: null
	Collection: { id: number }
	Welcome: null

	// other routes

	LogoutModal: null
}

export interface IRoute {
	component: ComponentType
	name: keyof TypeRootStackParameterList
	options?: {
		header?: ({
			navigation
		}: {
			navigation: NativeStackNavigationProp<ParamListBase>
		}) => JSX.Element
		headerShown?: boolean
		statusBarHidden?: boolean
	}
}
