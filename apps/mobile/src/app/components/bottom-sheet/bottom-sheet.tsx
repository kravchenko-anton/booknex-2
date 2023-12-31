import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import type { FC, PropsWithChildren, ReactNode } from 'react'
import { Color } from 'ui/colors'

interface BottomSheetProperties {
	snapPoints: (string | number)[]
	backgroundColor?: string
	indicatorColor?: string
	children: ReactNode
	onClose: () => void
}
const Sheet: FC<PropsWithChildren<BottomSheetProperties>> = ({
	snapPoints = ['40%', '60%'],
	backgroundColor = Color.foreground,
	indicatorColor = Color.white,
	children = null,
	onClose = () => {}
}) => {
	if (!children) return null
	return (
		<BottomSheet
			// enable gesture for empy space

			enableContentPanningGesture={true}
			enableHandlePanningGesture={true}
			enablePanDownToClose={true}
			enableOverDrag={true}
			backgroundStyle={{ backgroundColor: backgroundColor }}
			handleIndicatorStyle={{ backgroundColor: indicatorColor }}
			backdropComponent={backdropProperties => (
				<BottomSheetBackdrop
					{...backdropProperties}
					enableTouchThrough={true}
				/>
			)}
			snapPoints={snapPoints}
			onClose={onClose}
		>
			{children}
		</BottomSheet>
	)
}

export default Sheet
