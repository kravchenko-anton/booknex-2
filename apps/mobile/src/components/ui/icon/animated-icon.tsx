import PressableContainer from '@/components/pressable-container/pressable-container'
import { BorderRadiusSetting, PaddingSetting } from '@/components/ui/global-settings'
import { BackgroundColorSetting, BorderColorSetting, SizeSetting } from '@/components/ui/icon/icon-settings'
import type { IconProperties } from '@/components/ui/icon/icon-types'
import type { Style } from '@/types/global'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { memo } from 'react'
import Svg from 'react-native-svg'

const AnimatedIcon: FC<IconProperties> = ({
	icon,
	variant = 'ghost',
	size = 'small',
	color = Color.black,
	backgroundColor = Color.gray,
	fatness = 2,
	style,
	noPadding = false,
	...properties
}) => (
	<PressableContainer
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
		<Svg width={SizeSetting[size]} height={SizeSetting[size]} stroke={color} strokeWidth={fatness} {...icon.properties}>
			{icon.component}
		</Svg>
	</PressableContainer>
)

export default memo(AnimatedIcon)
