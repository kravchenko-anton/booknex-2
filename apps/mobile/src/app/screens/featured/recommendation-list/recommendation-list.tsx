import type { RecommendationProperties } from '@/screens/featured/recommendation-list/types'
import { ThumbsUp } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Flatlist, Icon, Title } from 'ui/components'

const RecommendationList: FC<RecommendationProperties> = ({
	data = [],
	...properties
}) => {
	return (
		<View className='bg-shade mb-0 mt-4 items-center  p-2 px-0'>
			<Icon icon={ThumbsUp} size='md' className=' h-[45px] w-[45px] p-2' />
			<Title weight='bold' className='mb-4' color={Color.white}>
				Recommended for you
			</Title>
			<Flatlist
				data={data as never}
				horizontal
				mt={0}
				className='mb-0'
				{...properties}
			/>
		</View>
	)
}
export default RecommendationList
