import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'
import type { PressableDefaultProperties } from '../../../../apps/mobile/src/app/components/component-types'

import type { ColorProperties, LineColorType } from '../../colors'

export interface IconProperties
	extends PressableDefaultProperties,
		ColorProperties {
	backgroundColor?: LineColorType | string
	icon: FC<SvgProps>
	fatness?: number
	noPadding?: boolean
	size: 'small' | 'medium' | 'large'
	variant?: 'filled' | 'outlined' | 'ghost'
}
