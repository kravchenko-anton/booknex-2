import type { RecommendationProperties } from '@/screens/featured/recommendation-list/types'
import { ThumbsUp } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Color } from 'ui/colors'
import { Icon, Title } from 'ui/components'

const RecommendationList: FC<RecommendationProperties> = ({
	...properties
}) => {
	if (properties?.data?.length === 0) return null
	return (
		<View className='relative mt-4 items-center px-2'>
			<Icon
				icon={ThumbsUp}
				size='md'
				className='bg-canvas mb-1 mt-4 h-[45px] w-[45px] p-2'
			/>
			<Title weight='bold' className='mb-4' color={Color.white}>
				Recommended for you
			</Title>
			<FlatList
				horizontal
				className='bg-shade rounded-md p-4'
				{...properties}
			/>
		</View>
	)
}
export default RecommendationList
