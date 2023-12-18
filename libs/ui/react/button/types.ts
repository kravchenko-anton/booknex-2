import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import type { Color } from '../../colors'

export interface ButtonProperties
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	isLoading?: boolean
	disabled?: boolean
	icon?: any
	size?: 'sm' | 'md' | 'lg'
	color?: keyof Omit<
		typeof Color,
		'background' | 'black' | 'white' | 'transparent'
	>
	children?: string
	fullWidth?: boolean
}
