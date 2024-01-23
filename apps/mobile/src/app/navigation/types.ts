import type { ParamListBase } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { ComponentType, FC } from 'react'
import type { SvgProps } from 'react-native-svg'
import type { UserLibraryCategoryType } from '../../../../backend/src/user/user.types'

export type TypeRootStackParameterList = {
	Author: { id: number }

	Book: { id: number }
	ComprehensiveList: {
		type: keyof UserLibraryCategoryType
	}
	Featured: null
	Feedback: { id: number }
	Genre: { id: number; name: string }
	Library: null
	Login: null
	Registration: { selectGenres: string[] }
	CheckEmail: null
	EnterField: {
		selectGenres: string[]
	}
	Alert: {
		icon: FC<SvgProps>
		type: 'danger' | 'primary' | 'secondary'
		description: string
		acceptText: string
		onAccept: () => void
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
