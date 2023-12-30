import PressableContainer from '@/components/animated-press/animated-press'
import { settings } from '@/components/book-card/vertical-card/settings'
import type { VerticalBookCardProperties } from '@/components/book-card/vertical-card/types'
import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Image, Title } from 'ui/components'

const VerticalCard: FC<VerticalBookCardProperties> = ({ ...card }) => (
	<PressableContainer
		className='bg-shade mb-1.5 w-full flex-row rounded-md p-2'
		{...card}
	>
		<Image
			url={card.image.uri}
			height={settings.height[card.size]}
			fullSize={true}
			width={settings.width[card.size]}
		/>
		<View className='flex-1 pb-0 pl-3'>
			<View>
				<Title size={22} weight='bold' numberOfLines={2}>
					{card.title}
				</Title>
				<Title
					size={16}
					weight='light'
					numberOfLines={card.descriptionLines}
					className='mb-2 mt-1'
					color={Color.gray}
				>
					{card.description}
				</Title>
			</View>
			{card.buttons && (
				<View className='flex-row flex-wrap items-center gap-2'>
					{card.buttons.map(
						({
							label,
							backgroundColor = Color.foreground,
							color = Color.white,
							...properties
						}) => (
							<Title
								key={label}
								size={16}
								className='rounded-md p-2'
								weight='medium'
								style={{
									backgroundColor: backgroundColor,
									color: color
								}}
								{...properties}
							>
								{label}
							</Title>
						)
					)}
				</View>
			)}
		</View>
	</PressableContainer>
)

export default VerticalCard
