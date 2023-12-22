import type { FC } from 'react'
import { memo } from 'react'
import { Pressable } from 'react-native'
import { Color } from 'ui/colors'
import { Style } from '../../../../apps/mobile/src/app/types/global'
import { BorderRadiusSettings } from '../../settings'
import {
	BackgroundColorSetting,
	BorderColorSetting,
	IconColorSetting,
	SizeSetting
} from './icon-settings'
import { IconProperties } from './icon-types'

export const iconPaddingSettings = {
	small: 4,
	medium: 6,
	large: 8
}

const Icon: FC<IconProperties> = ({
	icon: Icon,
	variant = 'ghost',
	size = 'small',
	color = Color.white,
	backgroundColor,
	fatness = 2,
	style,
	noPadding = false,
	...properties
}) => (
	<Pressable
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
	</Pressable>
)

export default memo(Icon)
