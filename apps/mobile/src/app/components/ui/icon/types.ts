import type { PressableDefaultProperties } from '@/components/component-types'
import type { ClampPaletteType } from 'global/colors'
import type { SizeProperties } from 'global/types'
import type { FC, SVGProps } from 'react'
import type { SvgProps } from 'react-native-svg'

export interface IconProperties
	extends PressableDefaultProperties,
		SizeProperties {
	icon: FC<SvgProps> | FC<SVGProps<SVGSVGElement>>
	fatness?: number
	fill?: boolean
	fullRounded?: boolean
	noPadding?: boolean
	variant?: ClampPaletteType | 'white-outlined' | 'transparent'
}
