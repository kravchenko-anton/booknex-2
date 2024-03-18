import { useReader } from '@/screens/reading/reader-context'
import { FontSizeSettings } from '@/screens/reading/reader-customization/font-size-settings'
import { FontStyleSettings } from '@/screens/reading/reader-customization/font-style-settings'
import { LineHeightSettings } from '@/screens/reading/reader-customization/line-height-settings'
import { PageMarginSettings } from '@/screens/reading/reader-customization/page-margin-settings'
import { ThemeStyleSettings } from '@/screens/reading/reader-customization/theme-style-settings'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import type { FC, RefObject } from 'react'
import { Pressable, View } from 'react-native'
//TODO: меньше кода тут

const ReaderCustomization: FC<{
	sheetRef: RefObject<BottomSheetModal>
}> = ({ sheetRef }) => {
	const { colorScheme } = useReader()
	return (
		<BottomSheetModal
			enableContentPanningGesture
			enableHandlePanningGesture
			enablePanDownToClose
			enableOverDrag
			snapPoints={[290, 290]}
			handleIndicatorStyle={{ backgroundColor: colorScheme.colorPalette.text }}
			ref={sheetRef}
			backgroundStyle={{
				backgroundColor: colorScheme.colorPalette.background.darker
			}}
			backdropComponent={backdropProperties => (
				<BottomSheetBackdrop {...backdropProperties} enableTouchThrough />
			)}
		>
			<Pressable>
				<FontStyleSettings />
				<View>
					<View className='w-full'>
						<ThemeStyleSettings />
						<FontSizeSettings />
					</View>

					<View className='mt-6 flex-row items-center justify-center'>
						<LineHeightSettings />

						<PageMarginSettings />
					</View>
				</View>
			</Pressable>
		</BottomSheetModal>
	)
}

export default ReaderCustomization
