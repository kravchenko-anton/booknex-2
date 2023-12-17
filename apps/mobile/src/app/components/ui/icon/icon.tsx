import { BackgroundColorSetting, BorderColorSetting, IconColorSetting, SizeSetting } from '@/components/ui/icon/icon-settings'
import type { IconProperties } from '@/components/ui/icon/icon-types'
import type { Style } from '@/types/global'
import type { FC } from 'react'
import { memo } from 'react'
import { Pressable } from 'react-native'
import { Color } from 'ui/colors'
import { BorderRadiusSetting, PaddingSetting } from 'ui/ui-style'

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
		{...properties}>
		<Icon
			width={SizeSetting[size]}
			strokeWidth={fatness}
			stroke={color ?? IconColorSetting[variant]}
			height={SizeSetting[size]}
		/>
	</Pressable>
)

export default memo(Icon)
