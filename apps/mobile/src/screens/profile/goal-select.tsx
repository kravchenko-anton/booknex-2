import { Button } from '@/ui'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { Color } from 'global/colors'
import type { FC, RefObject } from 'react'

//TODO: доделать adjust goals и сделать нормально
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
