import type { FC } from 'react'
import type { SizeProperties } from '../../../../apps/mobile/src/app/types/global'
import type { LineColorType, VividPaletteType } from '../../colors'
import type { DefaultButtonProperties } from '../components-props-types'

export interface ButtonProperties
	extends DefaultButtonProperties,
		SizeProperties {
	isLoading?: boolean
	disabled?: boolean
	icon?: FC<{ width: number; height: number; color: LineColorType }>
	variant?: VividPaletteType
	children?: string
	fullWidth?: boolean
}
