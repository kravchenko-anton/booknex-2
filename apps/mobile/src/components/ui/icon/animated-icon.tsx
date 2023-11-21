import PressableContainer from '@/components/pressable-container/pressable-container'
import { BorderRadiusSetting, PaddingSetting } from '@/components/ui/global-settings'
import { BackgroundColorSetting, BorderColorSetting, SizeSetting } from '@/components/ui/icon/icon-settings'
import type { IconProperties } from '@/components/ui/icon/icon-types'
import type { Style } from '@/types/global'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { memo } from 'react'

const AnimatedIcon: FC<IconProperties> = ({
	icon: Icon,
	variant = 'ghost',
	size = 'small',
	color = Color.black,
	backgroundColor,
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
		<Icon width={SizeSetting[size]} strokeWidth={fatness} stroke={color} height={SizeSetting[size]} />
	</PressableContainer>
)

export default memo(AnimatedIcon)
