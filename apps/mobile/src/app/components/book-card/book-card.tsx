import {
	heightSettings,
	widthSettings
} from '@/components/book-card/book-card-settings'
import type { BookCardProperties } from '@/components/book-card/book-card-types'
import PressableContainer from '@/components/pressable-container/pressable-container'
import type { Style } from '@/types/global'

import type { FC } from 'react'
import { memo } from 'react'
import { Color } from 'ui/colors'
import { Image, Title } from 'ui/components'

const BookCard: FC<BookCardProperties> = ({
	image,
	likedPercentage,
	pages,
	style,
	...properties
}) => (
	<PressableContainer
		style={[
			{
				width: widthSettings[image.size]
			},
			style as Style
		]}
		{...properties}
	>
		<Image
			url={image.uri}
			height={heightSettings[image.size]}
			width={widthSettings[image.size]}
		/>
		{(likedPercentage && !pages) ||
			(!likedPercentage && pages && (
				<Title
					numberOfLines={1}
					weight='semiBold'
					size={15}
					color={Color.gray}
					className=' mt-2'
				>
					{likedPercentage
						? `👍 ${likedPercentage}% liked`
						: ` 📖 ${pages} pages`}
				</Title>
			))}
		<Title numberOfLines={2} weight='bold' size={20} color={Color.black}>
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
