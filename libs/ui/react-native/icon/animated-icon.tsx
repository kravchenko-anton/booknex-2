import PressableContainer from '@/components/pressable-container/pressable-container'
import type { FC } from 'react'
import { memo } from 'react'
import { Color } from 'ui/colors'
import { BorderRadiusSetting, PaddingSetting } from 'ui/ui-style'
import { BackgroundColorSetting, BorderColorSetting } from './icon-settings'
import type { IconProperties } from './icon-types'


const AnimatedIcon: FC<IconProperties> = ({
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
	<PressableContainer
		className="items-center justify-center border-[2px]"
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
