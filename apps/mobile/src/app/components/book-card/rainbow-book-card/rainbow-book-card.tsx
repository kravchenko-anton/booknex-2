import PressableContainer from '@/components/animated-press/animated-press'
import type { RainbowBookCardProperties } from '@/components/book-card/rainbow-book-card/types'
import type { Style } from '@/types/global'
import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Image, Title } from 'ui/components'

const RainbowBookCard: FC<RainbowBookCardProperties> = ({
	image,
	style,
	...properties
}) => (
	<PressableContainer
		className='h-[300px] w-[300px] justify-between rounded-xl p-4'
		style={[
			{
				backgroundColor: properties.backgroundColor
			},
			style as Style
		]}
		{...properties}
	>
		<View className='items-center'>
			<Image url={image.uri} height={180} width={135} />
			<Title
				numberOfLines={1}
				className='mt-2'
				weight='bold'
				size={20}
				color={Color.white}
			>
				{properties.title}
			</Title>
		</View>
		<Title size={16} numberOfLines={3} color={Color.white} weight='light'>
			{properties.description}
		</Title>
	</PressableContainer>
)

export default RainbowBookCard
