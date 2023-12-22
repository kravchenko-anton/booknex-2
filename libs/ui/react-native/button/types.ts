import type { PressableDefaultProperties } from '@/components/component-types.ts'
import type { VividPaletteType } from '../../colors'

export type ButtonProperties = PressableDefaultProperties & {
	size: 'small' | 'medium' | 'large'
	text: string
	textSize?: number
	uppercase?: boolean
	variant?: VividPaletteType
	width?: number | string
}
