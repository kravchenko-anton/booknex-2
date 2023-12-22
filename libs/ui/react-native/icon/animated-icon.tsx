import PressableContainer from '@/components/pressable-container/pressable-container'
import type { FC } from 'react'
import { memo } from 'react'
import type { Style } from '../../../../apps/mobile/src/app/types/global'
import { Color } from '../../colors'
import { BorderRadiusSettings } from '../../settings'
import { iconPaddingSettings } from './icon'
import {
	BackgroundColorSetting,
	BorderColorSetting,
	IconColorSetting,
	SizeSetting
} from './settings'
import type { IconProperties } from './types'

const AnimatedIcon: FC<IconProperties> = ({
	icon: Icon,
	variant = 'ghost',
	size = 'small',
	color = Color.white,
	backgroundColor,
	fatness = 2,
	style = {},
	noPadding = false,
	...properties
}) => (
	<PressableContainer
		className='items-center justify-center border-[2px]'
		style={[
			{
				opacity: properties.disabled ? 0.5 : 1,
				padding: noPadding ? 0 : iconPaddingSettings[size],
				backgroundColor: backgroundColor ?? BackgroundColorSetting[variant],
				borderRadius: BorderRadiusSettings,
				borderColor: BorderColorSetting[variant]
			},
			style as Style
		]}
		{...properties}
	>
		<Icon
			width={SizeSetting[size]}
			strokeWidth={fatness}
			stroke={color ?? IconColorSetting[variant]}
			height={SizeSetting[size]}
		/>
	</PressableContainer>
)

export default memo(AnimatedIcon)
