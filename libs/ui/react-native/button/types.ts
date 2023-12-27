import type { PressableDefaultProperties } from '@/components/component-types.ts'
import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'
import type { VividPaletteType } from '../../colors'

export type ButtonProperties = PressableDefaultProperties & {
	size: 'sm' | 'md' | 'lg'
	text: string
	textSize?: number
	icon?: FC<SvgProps>
	isLoading?: boolean
	isDisabled?: boolean
	uppercase?: boolean
	variant?: VividPaletteType
	width?: number | string
}
