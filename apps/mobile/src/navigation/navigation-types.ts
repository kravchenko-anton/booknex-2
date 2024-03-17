import type { ParamListBase } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ComponentType } from 'react'

export type TypeRootStackParameterListType = {
	Book: { id: number }
	Featured: undefined
	BookReview: { id: number }
	Genre: { id: number; name: string }
	Library: undefined
	Login: undefined
	Register: undefined
	Profile: undefined
	Welcome: undefined
	Reader: { id: number }
	UpdateRecommendation: undefined
	Search: undefined
	Settings: undefined
	Logout: undefined
}

export type RouteProperties = {
	navigation?: NativeStackNavigationProp<TypeRootStackParameterListType>
}

export interface IRouteType {
	component: ComponentType<RouteProperties>
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
