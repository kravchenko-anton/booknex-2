import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'
import type { PressableDefaultProperties } from '../../../../apps/mobile/src/app/components/component-types'

import type { ClampPaletteType } from '../../colors'

export interface IconProperties extends PressableDefaultProperties {
	icon: FC<SvgProps>
	fatness?: number
	fullRounded?: boolean
	noPadding?: boolean
	size: 'sm' | 'md' | 'lg'
	variant?: ClampPaletteType | 'white-outlined'
}
