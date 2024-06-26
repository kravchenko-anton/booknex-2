import type { PressableDefaultProperties } from '@/types/component-types'
import type { VividPaletteType } from 'global/colors'
import type { SizeProperties, SizeType } from 'global/types'
import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'

export type ButtonProperties = PressableDefaultProperties &
	SizeProperties & {
		textSize?: SizeType | ('xl' | 'xxl')
		icon?: FC<SvgProps> | string
		isLoading?: boolean
		children?: any
		isDisabled?: boolean
		uppercase?: boolean
		pulse?: boolean
		variant?: VividPaletteType
		width?: number | string
	}
