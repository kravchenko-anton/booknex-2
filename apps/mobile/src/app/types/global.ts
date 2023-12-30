import type { ViewDefaultProperties } from '@/components/component-types'
import type { FC } from 'react'
import type {
	WithSpringConfig,
	WithTimingConfig
} from 'react-native-reanimated'
import type { SvgProps } from 'react-native-svg'

export type IconType = FC<SvgProps>
export interface IconProperties {
	icon: IconType
}
export interface AnimationConfigType {
	userConfig?: WithSpringConfig | WithTimingConfig
}

export type Style = ViewDefaultProperties['style']

export type SizeType = 'sm' | 'md' | 'lg'

export interface SizeProperties {
	size: SizeType
}
