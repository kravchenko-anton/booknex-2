import { Button, Title } from '@/ui'
import { windowWidth } from '@/utils/dimensions'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { Color } from 'global/colors'
import type { FC } from 'react'
import * as React from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
//TODO: доделать adjust goals и сделать нормально
const ITEM_SIZE = windowWidth * 0.38
const ITEM_SPACING = (windowWidth - ITEM_SIZE) / 2

const goals = [10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100]
interface GoalSelectModalProperties {
	sheetRef: React.RefObject<BottomSheetModal>
}
export const GoalSelectModal: FC<GoalSelectModalProperties> = ({
	sheetRef
}) => (
	<BottomSheetModal
		enableContentPanningGesture
		enableHandlePanningGesture
		enablePanDownToClose
		enableOverDrag
		ref={sheetRef}
		index={0}
		snapPoints={['20%']}
		handleIndicatorStyle={{ backgroundColor: Color.gray }}
		backgroundStyle={{
			backgroundColor: Color.foreground
		}}
		backdropComponent={backdropProperties => (
			<BottomSheetBackdrop
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				{...backdropProperties}
				enableTouchThrough
			/>
		)}>
		<FlatList
			horizontal
			showsHorizontalScrollIndicator={false}
			data={goals}
			snapToInterval={ITEM_SIZE}
			decelerationRate='fast'
			contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
			bounces={false}
			renderItem={({ item }) => (
				<View style={{ width: ITEM_SIZE }}>
					<Title size={'xxl'}>{item}</Title>
				</View>
			)}
		/>
		<Button
			size={'md'}
			variant={'foreground'}
			className='mx-auto mb-4 mt-2'
			onPress={() => sheetRef.current?.close()}>
			Select goal
		</Button>
	</BottomSheetModal>
)
