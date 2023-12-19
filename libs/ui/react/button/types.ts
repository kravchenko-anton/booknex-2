import type { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'
import type { TrigerComponentPaletteType } from '../component-palette'
import type { StyledComponentType } from '../components-props-types'

export interface ButtonProperties
	extends Pick<DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>, 'onClick' | 'type'>, StyledComponentType {
	isLoading?: boolean
	disabled?: boolean
	icon?: FC<{ width: number, height: number, color: string }>
	iconPosition?: 'left' | 'right'
	size?: 'sm' | 'md' | 'lg'
	color?: TrigerComponentPaletteType
	children?: ReactNode
	fullWidth?: boolean
}
