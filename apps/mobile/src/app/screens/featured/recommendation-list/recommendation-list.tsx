import { FlatList, Icon, Title } from '@/components'
import type { RecommendationProperties } from '@/screens/featured/recommendation-list/recommendation-list-types'
import { shadeRGBColor } from 'global/utils/shade-color'
import { ThumbsUp } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'react-native-linear-gradient'
import { Color } from 'ui/colors'

const RecommendationList: FC<RecommendationProperties> = ({
	                                                          ...properties
                                                          }) => {
	if (properties?.data?.length === 0) return null
	return (
		<View className="relative mt-4 items-center px-2">
			<View className="bg-pale absolute mb-4 h-full w-full rounded-[10px]">
				<LinearGradient
					colors={[Color.primary, shadeRGBColor(Color.primary, -50)]}
					className="h-[50%] rounded-xl"
				/>
			</View>
			<Icon
				icon={ThumbsUp}
				size="medium"
				className="bg-canvas mb-1 mt-4 h-[45px] w-[45px] p-2"
			/>
			<Title className="mb-4" weight="bold" color={Color.white}>
				Recommended for you
			</Title>
			<FlatList mt={0} horizontal className="mb-4" {...properties} />
		</View>
	)
}
export default RecommendationList