import type { PressableDefaultProperties } from '@/components/component-types.ts'
import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'
import type { SizeProperties } from '../../../../apps/mobile/src/app/types/global'
import type { VividPaletteType } from '../../colors'

export type ButtonProperties = PressableDefaultProperties &
	SizeProperties & {
		textSize?: number
		icon?: FC<SvgProps>
		isLoading?: boolean
		children?: string
		isDisabled?: boolean
		uppercase?: boolean
		variant?: VividPaletteType
		width?: number | string
	}
