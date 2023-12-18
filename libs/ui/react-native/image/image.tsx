import type { ImageTypes } from '@/components/ui/image/image-types.ts'
import { getFileUrl } from 'global/api-config'
import type { FC } from 'react'
import { memo } from 'react'
import { Image as DefaultImage } from 'react-native'
import { Color } from 'ui/colors'

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
