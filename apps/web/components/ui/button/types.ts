import type { LineColorType, VividPaletteType } from 'global/colors'
import type { SizeProperties } from 'global/types'
import type { FC } from 'react'
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
