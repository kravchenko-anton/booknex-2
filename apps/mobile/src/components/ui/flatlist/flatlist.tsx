import type { FlatListProperties } from '@/components/ui/flatlist/flatlist-types'
import { Title } from '@/components/ui/title/title'
import { Color } from '@/utils/color'
import { FlatList as DefaultFlatlist, View } from 'react-native'

const FlatList = <T,>({
	title,
	data = [],
	Ref,
	elementSpacing = 12,
	contentContainerStyle,
	mt = 24,
	px = 8,
	style,
	...properties
}: FlatListProperties<T>) => {
	if (data.length === 0 && !properties.ListEmptyComponent) return
	return (
		<>
			<Title
				style={[
					{
						marginTop: mt,
						paddingHorizontal: properties.horizontal ? px : 0,
						marginBottom: title?.mb ?? 12
					},
					title?.style ?? {}
				]}
				color={title?.color ?? Color.black}
				size={22}
				weight='semiBold'>
				{title?.text}
			</Title>
			<DefaultFlatlist
				data={data}
				ref={Ref}
				style={title?.text ? style : [{ marginTop: mt }, style]}
				ItemSeparatorComponent={() => (
					<View
						style={
							properties.horizontal
								? { width: elementSpacing }
								: { height: elementSpacing }
						}
					/>
				)}
				contentContainerStyle={{
					paddingHorizontal: properties.horizontal ? px : 0,
					paddingBottom: 8
				}}
				bounces={false}
				renderToHardwareTextureAndroid={true}
				alwaysBounceHorizontal={false}
				alwaysBounceVertical={false}
				maxToRenderPerBatch={10}
				initialNumToRender={10}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				decelerationRate='normal'
				{...properties}
			/>
		</>
	)
}

export default FlatList
