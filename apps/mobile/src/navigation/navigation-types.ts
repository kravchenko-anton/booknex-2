import type { ParamListBase } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ComponentType } from 'react'
import type { GoBackGesture } from 'react-native-reanimated'

export type TypeRootStackParameterListType = {
	Book: { slug: string }
	Featured: undefined
	BookImpression: { slug: string }
	Genre: { slug: string; name: string }
	Library: undefined
	Login: undefined
	Register: undefined
	Profile: undefined
	Reactions: { slug: string }
	Welcome: undefined
	Reader: { slug: string; initialScrollPosition: number }
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
		goBackGesture?: GoBackGesture | undefined
		statusBarHidden?: boolean
	}
}
