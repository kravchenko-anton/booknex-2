import type { FC } from 'react'
import type { LineColorType, VividPaletteType } from '../../colors'
import type { DefaultButtonProperties } from '../components-props-types'

export interface ButtonProperties extends DefaultButtonProperties {
	isLoading?: boolean
	disabled?: boolean
	icon?: FC<{ width: number; height: number; color: LineColorType }>
	size?: 'sm' | 'md' | 'lg'
	variant?: VividPaletteType
	children?: string
	fullWidth?: boolean
}
