import type { FC, ReactNode } from 'react'
import type { DefaultButtonProperties } from '../components-props-types'
import type { ButtonColorPaletteType } from './styles'

export interface ButtonProperties
	extends DefaultButtonProperties {
	isLoading?: boolean
	disabled?: boolean
	icon?: FC<{ width: number, height: number, color: string }>
	iconPosition?: 'left' | 'right'
	size?: 'sm' | 'md' | 'lg'
	color?: ButtonColorPaletteType
	children?: ReactNode
	fullWidth?: boolean
}


