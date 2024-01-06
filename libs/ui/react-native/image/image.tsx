import type { FC } from 'react'
import { memo } from 'react'
import { Image as DefaultImage } from 'react-native'
import { twMerge } from 'tailwind-merge'
import { getFileUrl } from '../../../global/api-config'
import type { Types } from './types'

const Image: FC<Types> = ({
	height = 100,
	width = 100,
	borderRadius = 12,
	url = '',
	className,
	style,
	fullSize = false,
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
				height,
				borderRadius
			},
			style
		]}
		className={twMerge('bg-vibrant', fullSize ? 'h-full' : 'h-auto', className)}
		{...properties}
	/>
)

export default memo(Image)
