import type { FC } from 'react'
import type { VividPaletteType } from '../../colorPalette'
import type { DefaultButtonProperties } from '../components-props-types'

export interface ButtonProperties extends DefaultButtonProperties {
	isLoading?: boolean
	disabled?: boolean
	icon?: FC<{ width: number; height: number }>
	size?: 'sm' | 'md' | 'lg'
	variant?: VividPaletteType
	children?: string
	fullWidth?: boolean
}
