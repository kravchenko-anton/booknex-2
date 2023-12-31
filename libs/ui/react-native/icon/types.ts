import type { FC, SVGProps } from 'react'
import type { SvgProps } from 'react-native-svg'
import type { PressableDefaultProperties } from '../../../../apps/mobile/src/app/components/component-types'
import type { SizeProperties } from '../../../../apps/mobile/src/app/types/global'

import type { ClampPaletteType } from '../../colors'

export interface IconProperties
	extends PressableDefaultProperties,
		SizeProperties {
	icon: FC<SvgProps> | FC<SVGProps<SVGSVGElement>>
	fatness?: number
	fullRounded?: boolean
	noPadding?: boolean
	variant?: ClampPaletteType | 'white-outlined' | 'transparent'
}
