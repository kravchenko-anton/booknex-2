import type { FC } from 'react'
import { memo } from 'react'
import { Text } from 'react-native'
import { Color } from 'ui/colors'
import { fontSettings } from './settings'
import type { TitleProperties } from './types'

const Title: FC<TitleProperties> = ({
	children,
	numberOfLines = 1,
	weight = 'light',
	size = 20,
	center = false,
	style,
	...properties
}) => {
	if (!children) return null
	return (
		<Text
			style={[
				{
					fontFamily: fontSettings[weight],
					fontSize: size,
					textAlign: center ? 'center' : 'left',
					color: properties.color ?? Color.white
				},
				style
			]}
			numberOfLines={numberOfLines}
			{...properties}
		>
			{children}
		</Text>
	)
}

export default memo(Title)
