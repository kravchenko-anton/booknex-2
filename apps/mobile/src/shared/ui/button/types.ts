import type { PressableDefaultProperties } from '@/shared/types/component-types'
import type { VividPaletteType } from 'global/colors'
import type { SizeProperties } from 'global/types'
import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'

export type ButtonProperties = PressableDefaultProperties &
	SizeProperties & {
		textSize?: number
		icon?: FC<SvgProps>
		isLoading?: boolean
		children?: string
		isDisabled?: boolean
		uppercase?: boolean
		pulse?: boolean
		variant?: VividPaletteType
		width?: number | string
	}
