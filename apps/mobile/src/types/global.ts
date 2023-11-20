import type { SvgProperties } from '@/icons/icons'
import type { ViewDefaultProperties } from '@/types/component-types'
import type { WithSpringConfig, WithTimingConfig } from 'react-native-reanimated'

export type IconType = SvgProperties
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


export type HamburgerMenuElementType = {
	onPress: () => void
	title: string
	icon: IconType
}
