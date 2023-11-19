import FlatList from '@/components/ui/flatlist/flatlist'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import type { RecommendationProperties } from '@/screens/featured/recommendation-list/recommendation-list-types'
import { Color } from '@/utils/color'
import { shadeRGBColor } from '@/utils/shade-color'
import { LinearGradient } from 'expo-linear-gradient'
import type { FC } from 'react'
import { View } from 'react-native'

const RecommendationList: FC<RecommendationProperties> = ({
	...properties
}) => (
	<View className='relative mt-4 items-center px-2'>
		<View className='absolute mb-4 h-full w-full rounded-[10px] bg-pale'>
			<LinearGradient
				colors={[Color.primary, shadeRGBColor(Color.primary, -50)]}
				start={[0.1, 1.5]}
				end={[1, 0.9]}
				className='h-[50%] rounded-xl'
			/>
		</View>
		<Icon
			name='thumbsup'
			size={'medium'}
			className='mb-1 mt-4 h-[45px] w-[45px] bg-canvas p-2'
		/>
		<Title className='mb-4' weight={'bold'} color={Color.white}>
			Recommended for you
		</Title>
		<FlatList mt={0} horizontal className='mb-4' {...properties} />
	</View>
)

export default RecommendationList
