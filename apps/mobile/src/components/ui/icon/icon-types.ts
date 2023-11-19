import type { PressableDefaultProperties } from '@/types/component-types'
import type { IconType } from '@/types/global'
import type { ColorProperties, LineColorType } from '@/utils/color'

export interface IconProperties
	extends PressableDefaultProperties,
		ColorProperties {
	backgroundColor?: LineColorType | string
	name: IconType
	noPadding?: boolean
	size: 'small' | 'medium' | 'large'
	variant?: 'filled' | 'outlined' | 'ghost'
}
