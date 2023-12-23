import PressableContainer from '@/components/animated-press/animated-press'
import { settings } from '@/components/book-card/settings'
import type { BookCardProperties } from '@/components/book-card/types'
import type { Style } from '@/types/global'

import type { FC } from 'react'
import { memo } from 'react'
import { Color } from 'ui/colors'
import { Image, Title } from 'ui/components'

const BookCard: FC<BookCardProperties> = ({
	image,
	pages,
	style,
	...properties
}) => (
	<PressableContainer
		style={[
			{
				width: settings.width[image.size]
			},
			style as Style
		]}
		{...properties}
	>
		<Image
			url={image.uri}
			height={settings.height[image.size]}
			width={settings.width[image.size]}
		/>
		{pages && (
			<Title
				numberOfLines={1}
				weight='semiBold'
				size={15}
				color={Color.gray}
				className=' mt-2'
			>
				{` 📖 ${pages} pages`}
			</Title>
		)}
		<Title numberOfLines={2} weight='bold' size={20}>
			{properties.title}
		</Title>
		<Title
			numberOfLines={1}
			weight='regular'
			size={16}
			color={Color.gray}
			className='mt-1'
		>
			{properties.author}
		</Title>
	</PressableContainer>
)

export default memo(BookCard)
