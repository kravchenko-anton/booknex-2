import AnimatedPress from '@/components/animated-press/animated-press'
import { settings } from '@/components/book-card/settings'
import type { BookCardProperties } from '@/components/book-card/types'
import { Image, Title } from '@/components/ui'
import type { Style } from '@/types/global'
import { Color } from 'global/colors'

import type { FC } from 'react'
import { memo } from 'react'

const BookCard: FC<BookCardProperties> = ({
	image,
	size = 'md',
	style,
	...properties
}) => (
	<AnimatedPress
		style={[
			{
				width: settings.width[size]
			},
			style as Style
		]}
		{...properties}
	>
		<Image
			url={image.uri}
			borderRadius={14}
			className='mb-2'
			height={settings.height[size]}
			width={settings.width[size]}
		/>

		<Title numberOfLines={2} color={Color.gray} weight='medium' size={16}>
			{properties.title}
		</Title>

		<Title numberOfLines={1} weight='regular' size={15} color={Color.gray}>
			{properties.author}
		</Title>
	</AnimatedPress>
)

export default memo(BookCard)
