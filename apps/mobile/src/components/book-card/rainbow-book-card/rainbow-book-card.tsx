import type { RainbowBookCardProperties } from '@/components/book-card/rainbow-book-card/rainbow-book-card-types'
import PressableContainer from '@/components/pressable-container/pressable-container'
import Image from '@/components/ui/image/image'
import { Title } from '@/components/ui/title/title'
import type { Style } from '@/types/global'
import { Color } from '@/utils/color'
import type { FC } from 'react'
import { View } from 'react-native'

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
			{...properties}>
			<View className='items-center'>
				<Image url={image.uri} height={140} width={100} />
				<Title
					numberOfLines={1}
					className='mt-2'
					weight={'bold'}
					size={20}
					color={Color.white}>
					{properties.title}
				</Title>
			</View>
			<Title size={16} numberOfLines={3} color={Color.white} weight={'regular'}>
				{properties.description}
			</Title>
		</PressableContainer>
	)

export default RainbowBookCard
