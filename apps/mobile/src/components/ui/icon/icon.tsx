import {
	BorderRadiusSetting,
	PaddingSetting
} from '@/components/ui/global-settings'
import {
	BackgroundColorSetting,
	BorderColorSetting,
	IconColorSetting,
	SizeSetting
} from '@/components/ui/icon/icon-settings'
import type { IconProperties } from '@/components/ui/icon/icon-types'
import type { Style } from '@/types/global'
import { Octicons } from '@expo/vector-icons'
import type { FC } from 'react'
import { memo } from 'react'
import { Pressable } from 'react-native'

const Icon: FC<IconProperties> = ({
	name = 'alert',
	variant = 'ghost',
	size = 'small',
	color,
	backgroundColor,
	style,
	noPadding = false,
	...properties
}) => (
	<Pressable
		className='items-center justify-center border-[2px]'
		style={[
			{
				opacity: properties.disabled ? 0.5 : 1,
				padding: noPadding ? 0 : PaddingSetting[size],
				backgroundColor: backgroundColor ?? BackgroundColorSetting[variant],
				borderRadius: BorderRadiusSetting,
				borderColor: BorderColorSetting[variant]
			},
			style as Style
		]}
		{...properties}>
		<Octicons
			name={name}
			size={SizeSetting[size]}
			color={color ?? IconColorSetting[variant]}
		/>
	</Pressable>
)

export default memo(Icon)
