import type { RecommendationProperties } from '@/screens/featured/recommendation-list/types'
import type { FC } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const RecommendationList: FC<RecommendationProperties> = ({
	...properties
}) => {
	if (properties?.data?.length === 0) return null
	return (
		<View className='bg-shade relative mx-2 mt-4 items-center rounded-xl p-4 px-2'>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				className=''
				{...properties}
			/>
		</View>
	)
}
export default RecommendationList
