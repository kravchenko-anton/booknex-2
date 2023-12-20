import { heightSettings, widthSettings } from '@/components/book-card/vertical-card/vertical-card-settings'
import type { VerticalBookCardProperties } from '@/components/book-card/vertical-card/vertical-card-types'
import PressableContainer from '@/components/pressable-container/pressable-container'
import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Image, Title } from 'ui/components'

const VerticalCard: FC<VerticalBookCardProperties> = ({ ...card }) => (
	<PressableContainer
		style={{
			height: heightSettings[card.image.size]
		}}
		className="bg-vibrant mb-1.5 w-full flex-row rounded-lg p-2"
		{...card}
	>
		<Image
			url={card.image.uri}
			height={heightSettings[card.image.size]}
			fullSize={true}
			width={widthSettings[card.image.size]}
		/>
		<View className="flex-1 pb-0 pl-3">
			<View>
				<Title size={22} weight="bold" numberOfLines={2}>
					{card.title}
				</Title>
				<Title
					size={16}
					weight="light"
					numberOfLines={card.descriptionLines}
					className="mb-2 mt-1"
					color={Color.gray}
				>
					{card.description}
				</Title>
			</View>
			{card.buttons && (
				<View className="flex-row flex-wrap items-center gap-2">
					{card.buttons.map(
						({
							 label,
							 backgroundColor = Color.shade,
							 color = Color.white,
							 ...properties
						 }) => (
							<Title
								key={label}
								size={16}
								className="rounded-xl p-2"
								weight="medium"
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