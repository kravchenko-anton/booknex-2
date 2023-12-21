import type { FC, ReactNode } from 'react'
import type { Color } from '../../colors'
import type { DefaultButtonProperties } from '../components-props-types'

export type ButtonColorPaletteType = keyof Pick<
	typeof Color,
	| 'gray'
	| 'primary'
	| 'secondary'
	| 'danger'
	| 'success'
	| 'foreground'
	| 'warning'
	| 'vibrant'
>

export interface ButtonProperties extends DefaultButtonProperties {
	isLoading?: boolean
	disabled?: boolean
	icon?: FC<{ width: number; height: number; color: string }>
	iconPosition?: 'left' | 'right'
	size?: 'sm' | 'md' | 'lg'
	color?: ButtonColorPaletteType
	children?: ReactNode
	fullWidth?: boolean
}
