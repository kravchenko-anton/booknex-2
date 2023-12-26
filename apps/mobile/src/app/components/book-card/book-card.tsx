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
			borderRadius={30}
			height={settings.height[image.size]}
			width={settings.width[image.size]}
		/>
		{pages && (
			<Title
				numberOfLines={1}
				weight='semiBold'
				size={14}
				color={Color.gray}
				className=' mt-2'
			>
				{` 📖 ${pages} pages`}
			</Title>
		)}
		<Title
			numberOfLines={2}
			color={Color.gray}
			center
			weight='medium'
			size={16}
		>
			{properties.title}
		</Title>
		<Title
			center
			numberOfLines={1}
			weight='regular'
			size={13}
			color={Color.gray}
			className='mt-1'
		>
			{properties.author && `by ${properties.author}`}
		</Title>
	</PressableContainer>
)

export default memo(BookCard)
