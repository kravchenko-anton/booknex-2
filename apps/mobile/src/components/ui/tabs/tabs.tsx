import Button from '@/components/ui/button/button'
import type { Route, TabsProperties } from '@/components/ui/tabs/tabs-types'
import { WINDOW_WIDTH } from '@/utils/dimensions'
import type { FC } from 'react';
import { memo, useRef, useState } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const Tabs: FC<TabsProperties> = ({ routes = [], ...properties }) => {
	const [activeTab, setActiveTab] = useState(routes[0].key)
	const flatListReference = useRef<FlatList>(null)
	const tabListReference = useRef<FlatList>(null)
	return (
		<View {...properties}>
			<View>
				<FlatList
					ref={tabListReference}
					renderToHardwareTextureAndroid={true}
					horizontal={true}
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					bounces={false}
					ItemSeparatorComponent={() => <View className='w-[10px]' />}
					data={routes}
					// If you add ref, the types break
					renderItem={({ item: tab }: { item: Route }) => (
							<Button
								size={'medium'}
								onPress={() => {
									const index: number = routes.findIndex(
										route => route.key === tab.key
									)
									tabListReference.current?.scrollToIndex({ index })
									flatListReference.current?.scrollToIndex({ index })
								}}
								variant={activeTab === tab.key ? 'primary' : 'dust'}
								text={tab.title}
							/>
						)}
				/>
			</View>
			<FlatList
				horizontal={true}
				bounces={false}
				showsVerticalScrollIndicator={false}
				pagingEnabled={true}
				ref={flatListReference}
				onScroll={event => {
					const index = Math.round(
						event.nativeEvent.contentOffset.x / WINDOW_WIDTH
					)
					tabListReference.current?.scrollToIndex({ index })
					setActiveTab(routes[index].key)
				}}
				snapToInterval={WINDOW_WIDTH}
				showsHorizontalScrollIndicator={false}
				renderToHardwareTextureAndroid={true}
				data={routes}
				renderItem={({ item }) => (
						<View
							style={{
								maxWidth: WINDOW_WIDTH,
								width: WINDOW_WIDTH
							}}>
							{item.component}
						</View>
					)}
			/>
		</View>
	)
}

export default memo(Tabs)
