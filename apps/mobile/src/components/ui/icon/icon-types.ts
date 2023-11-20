import type { SvgProperties } from '@/icons/icons'
import type { PressableDefaultProperties } from '@/types/component-types'
import type { ColorProperties, LineColorType } from '@/utils/color'

export interface IconProperties
	extends PressableDefaultProperties,
		ColorProperties {
	backgroundColor?: LineColorType
	icon: SvgProperties
	fatness?: number
	noPadding?: boolean
	size: 'small' | 'medium' | 'large'
	variant?: 'filled' | 'outlined' | 'ghost'
}
