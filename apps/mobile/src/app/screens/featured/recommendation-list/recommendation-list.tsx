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
		<View className=' bg-shade m-2 mb-0 mt-4 items-center rounded-xl p-3 px-0'>
			<Icon icon={ThumbsUp} size='md' className=' h-[45px] w-[45px] p-2' />
			<Title weight='bold' className='mb-4' color={Color.white}>
				Recommended for you
			</Title>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				className='mb-0 px-4'
				{...properties}
			/>
		</View>
	)
}
export default RecommendationList
