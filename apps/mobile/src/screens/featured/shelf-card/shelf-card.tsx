import PressableContainer from '@/components/pressable-container/pressable-container'
import { Title } from '@/components/ui/title/title'
import type { PressableDefaultProperties } from '@/types/component-types'
import { Color } from '@/utils/color'
import { LinearGradient } from 'expo-linear-gradient'
import type { FC } from 'react'
import { ImageBackground } from 'react-native'

interface ShelfListItemProperties extends PressableDefaultProperties {
	name: string
	picture: string
}
const ShelfCard: FC<ShelfListItemProperties> = properties => (
	<PressableContainer
		className='h-[130px] w-[120px] rounded-xl'
		{...properties}>
		<ImageBackground
			source={{
				uri: properties.picture
			}}
			borderRadius={12}
			className='h-full w-full flex-1'>
			<LinearGradient
				colors={['transparent', Color.black]}
				start={[0.2, 0.2]}
				end={[0, 0.8]}
				className='absolute h-full w-full flex-1 rounded-xl'
			/>
			<Title
				numberOfLines={2}
				color={Color.white}
				weight={'bold'}
				className='mb-2 ml-2 mt-auto'
				size={16}>
				{properties.name}
			</Title>
		</ImageBackground>
	</PressableContainer>
)

export default ShelfCard
