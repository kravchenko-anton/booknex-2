import { Button } from '@/ui'
import { windowWidth } from '@/utils/dimensions'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { Color } from 'global/colors'
import type { FC, RefObject } from 'react'
//TODO: доделать adjust goals и сделать нормально
const ITEM_SIZE = windowWidth * 0.38
const ITEM_SPACING = (windowWidth - ITEM_SIZE) / 2

const goals = [10, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100]
interface GoalSelectModalProperties {
	sheetRef: RefObject<BottomSheetModal>
}
export const GoalSelectModal: FC<GoalSelectModalProperties> = ({}) => (
	<BottomSheetModal
		enableContentPanningGesture
		enableHandlePanningGesture
		enablePanDownToClose
		enableOverDrag
		ref={null}
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
		<Button size={'md'} variant={'foreground'} className='mx-auto mb-4 mt-2'>
			Select goal
		</Button>
	</BottomSheetModal>
)
