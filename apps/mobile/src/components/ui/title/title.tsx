import { fontSettings } from '@/components/ui/title/title-settings'
import type { TitleProperties } from '@/components/ui/title/title-types'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { memo } from 'react'
import { Text } from 'react-native'

const Title: FC<TitleProperties> = ({
	children,
	numberOfLines = 1,
	weight = 'light',
	size = 20,
	center = false,
	style,
	...properties
  }) => {
	return 	<Text
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
}

export default memo(Title)
