import type { ParamListBase } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ComponentType } from 'react'

export type TypeRootStackParameterList = {
	Book: { id: number }

	Featured: undefined
	BookFeedback: { id: number }
	Genre: { id: number; name: string }
	Library: undefined
	Login: undefined
	Registration: { selectGenres: string[] }
	SelectGenres: undefined
	Profile: undefined
	Reader: { id: number }
	Search: undefined
	Settings: undefined
	Collection: { id: number }
	Welcome: undefined

	// other routes
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
