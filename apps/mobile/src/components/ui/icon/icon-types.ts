import type { PressableDefaultProperties } from '@/types/component-types'
import type { ColorProperties, LineColorType } from '@/utils/color'
import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'

export interface IconProperties
	extends PressableDefaultProperties,
		ColorProperties {
	backgroundColor?: LineColorType | string
	icon:FC<SvgProps>
	fatness?: number
	noPadding?: boolean
	size: 'small' | 'medium' | 'large'
	variant?: 'filled' | 'outlined' | 'ghost'
}
