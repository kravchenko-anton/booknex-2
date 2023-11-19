import type { ViewDefaultProperties } from '@/types/component-types'
import type { Octicons } from '@expo/vector-icons'
import type { Dispatch, SetStateAction } from 'react'
import type {
	WithSpringConfig,
	WithTimingConfig
} from 'react-native-reanimated'

export type IconType = keyof typeof Octicons.glyphMap
export interface IconProperties {
	icon: IconType
}
export interface AnimationConfigType {
	userConfig?: WithSpringConfig | WithTimingConfig
}

export interface Dimensions {
	height: number
	width: number
}
export type Style = ViewDefaultProperties['style']

export interface DefaultModelFields {
	createdAt: string
	id: number
	updatedAt: string
}

export interface PopupTypes<T> {
	isActivePopup: boolean
	setIsActivePopup: Dispatch<SetStateAction<T>>
}

export type HamburgerMenuElementType = {
	onPress: () => void
	title: string
	icon: IconType
}
