import type BottomSheet from '@gorhom/bottom-sheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useEffect, useMemo, useRef } from 'react'
import { Text, View } from 'react-native'
//TODO: доделать select text
const ReaderTextSelect = () => {
	const snapPoints = useMemo(() => ['25%'], [])
	const reference = useRef<BottomSheet>(null)
	useEffect(() => {
		reference.current?.expand()
		return () => reference.current?.close()
	}, [])
	return (
		<BottomSheetModal
			detached
			enablePanDownToClose
			snapPoints={snapPoints}
			bottomInset={46}
		>
			<View>
				<Text>Awesome 🎉</Text>
			</View>
		</BottomSheetModal>
	)
}

export default ReaderTextSelect
