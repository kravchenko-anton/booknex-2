import type { ParamListBase } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ComponentType } from 'react'

export type TypeRootStackParameterListType = {
	Book: { id: number }

	Featured: undefined
	BookFeedback: { id: number }
	Genre: { id: number; name: string }
	Library: undefined
	Login: undefined
	Register: undefined
	Profile: undefined
	Welcome: undefined
	Reader: { id: number }
	Search: undefined
	Settings: undefined
}

export interface IRouteType {
	component: ComponentType
	name: keyof TypeRootStackParameterListType
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
