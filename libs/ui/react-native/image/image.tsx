import type { FC } from 'react'
import { memo } from 'react'
import { Image as DefaultImage } from 'react-native'
import { getFileUrl } from '../../../global/api-config'
import { Color } from '../../colors'
import type { Types } from './types'

const Image: FC<Types> = ({
	height = 100,
	width = 100,
	borderRadius = 12,
	url,
	style,
	fullSize,
	...properties
}) => (
	<DefaultImage
		source={{
			uri: getFileUrl(url),
			width,
			height
		}}
		style={[
			{
				width,
				height: fullSize ? '100%' : height,
				backgroundColor: Color.shade,
				borderRadius
			},
			style
		]}
		{...properties}
	/>
)

export default memo(Image)
