import type { PressableDefaultProperties } from '@/components/component-types.ts'
import type { Color } from 'ui/colors'

export type ButtonProperties = PressableDefaultProperties & {
	size: 'small' | 'medium' | 'large'
	text: string
	textSize?: number
	uppercase?: boolean
	variant?: keyof Omit<
		typeof Color,
		'background' | 'black' | 'white' | 'transparent'
	>
	width?: number | string
}
