import { Flatlist, Title } from '@/ui'
import type { FlatListProperties } from '@/ui/flatlist/types'
import { Color } from 'global/colors'
import { View } from 'react-native'

interface BannerListProperties<T> extends FlatListProperties<T> {
	title: string
}

const BannerList = <T,>({
	title,
	data,
	style,
	...properties
}: BannerListProperties<T>) => {
	if (!data) return null
	return (
		<View
			style={style}
			className='bg-foreground border-muted mb-0 ml-2 mt-4 rounded-2xl rounded-r-none border-2 border-r-0  p-3 px-0'
		>
			<View className='pl-4'>
				<Title weight='bold' color={Color.white}>
					{title}
				</Title>
				<Title weight='regular' className='mb-4' size={14} color={Color.gray}>
					{data.length.toString()} books
				</Title>
			</View>
			<Flatlist horizontal px={16} mt={0} data={data} {...properties} />
		</View>
	)
}

export default BannerList
