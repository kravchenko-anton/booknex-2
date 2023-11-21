import type { ViewDefaultProperties } from '@/types/component-types'
import type { FC } from 'react'
import type { WithSpringConfig, WithTimingConfig } from 'react-native-reanimated'
import type { SvgProps } from 'react-native-svg'

export type IconType = FC<SvgProps>
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
