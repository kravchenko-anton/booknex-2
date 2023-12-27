import AnimatedPress from '@/components/animated-press/animated-press'
import { settings } from '@/components/book-card/settings'
import type { BookCardProperties } from '@/components/book-card/types'
import type { Style } from '@/types/global'

import type { FC } from 'react'
import { memo } from 'react'
import { Color } from 'ui/colors'
import { Image, Title } from 'ui/components'

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
		<Title
			numberOfLines={1}
			weight='semiBold'
			size={14}
			color={Color.gray}
			className=' mt-2'
		>
			{properties.pages && `📖 ${properties.pages} pages`}
		</Title>
		<Title numberOfLines={2} color={Color.gray} weight='medium' size={16}>
			{properties.title}
		</Title>

		<Title
			numberOfLines={1}
			weight='regular'
			size={13}
			color={Color.gray}
			className='mt-1'
		>
			{properties.author && `by ${properties.author}`}
		</Title>
	</AnimatedPress>
)

export default memo(BookCard)
