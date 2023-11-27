import type { ImageTypes } from '@/components/ui/image/image-types'
import { getFileUrl } from '@/services/api-config'
import { Color } from '@/ui/colors'
import type { FC } from 'react'
import { memo } from 'react'
import { Image as DefaultImage } from 'react-native'

const Image: FC<ImageTypes> = ({
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
