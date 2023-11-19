import { fontSettings } from '@/components/ui/title/title-settings'
import type { TitleProperties } from '@/components/ui/title/title-types'
import { Color } from '@/utils/color'
import { memo } from 'react'
import { Text } from 'react-native'

export const Title = memo(
	({
		children,
		numberOfLines = 1,
		weight = 'light',
		size = 20,
		center = false,
		style,
		...properties
	}: TitleProperties) => {
		if (!children && children !== 0) return null
		return (
			<Text
				style={[
					{
						fontFamily: fontSettings[weight],
						fontSize: size,
						textAlign: center ? 'center' : 'left',
						color: properties.color ?? Color.black
					},
					style
				]}
				numberOfLines={numberOfLines}
				{...properties}>
				{children}
			</Text>
		)
	}
)
