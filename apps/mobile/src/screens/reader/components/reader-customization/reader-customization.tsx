import { useCustomizationStore } from '@/screens/reader/components/reader-customization/customization-store'
import { FontSizeSettings } from '@/screens/reader/components/reader-customization/ui/font-size-settings'
import { FontStyleSettings } from '@/screens/reader/components/reader-customization/ui/font-style-settings'
import { LineHeightSettings } from '@/screens/reader/components/reader-customization/ui/line-height-settings'
import { PageMarginSettings } from '@/screens/reader/components/reader-customization/ui/page-margin-settings'
import { ThemeStyleSettings } from '@/screens/reader/components/reader-customization/ui/theme-style-settings'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { Color } from 'global/colors'
import type { FC, RefObject } from 'react'
import { Pressable, View } from 'react-native'

interface ReaderCustomizationProperties {
	sheetRef: RefObject<BottomSheetModal>
}

const ReaderCustomization: FC<ReaderCustomizationProperties> = ({
	sheetRef
}) => {
	const {
		colorScheme,
		font,
		fontSize,
		lineHeight,
		padding,
		changePadding,
		changeTheme,
		changeLineHeight,
		changeFontFamily,
		changeFontSize
	} = useCustomizationStore(state => state)
	return (
		<BottomSheetModal
			enableContentPanningGesture
			enableHandlePanningGesture
			enablePanDownToClose
			enableOverDrag
			snapPoints={[290, 290]}
			ref={sheetRef}
			style={{
				borderColor: Color.bordered,
				borderWidth: 1,
				borderTopLeftRadius: 16,
				borderTopRightRadius: 16
			}}
			handleIndicatorStyle={{
				backgroundColor: colorScheme.colorPalette.text
			}}
			backgroundStyle={{
				backgroundColor: colorScheme.colorPalette.background.darker
			}}
			backdropComponent={backdropProperties => (
				<BottomSheetBackdrop {...backdropProperties} enableTouchThrough />
			)}>
			<Pressable>
				<FontStyleSettings
					changeFontFamily={changeFontFamily}
					activeFont={font}
					colorScheme={colorScheme}
				/>
				<View>
					<View className='w-full'>
						<ThemeStyleSettings
							colorScheme={colorScheme}
							changeTheme={changeTheme}
						/>
						<FontSizeSettings
							colorScheme={colorScheme}
							activeFontSize={fontSize}
							changeFontSize={changeFontSize}
						/>
					</View>

					<View className='mt-6 flex-row items-center justify-center'>
						<LineHeightSettings
							colorScheme={colorScheme}
							changeLineHeight={changeLineHeight}
							lineHeight={lineHeight}
						/>

						<PageMarginSettings
							colorScheme={colorScheme}
							changePadding={changePadding}
							padding={padding}
						/>
					</View>
				</View>
			</Pressable>
		</BottomSheetModal>
	)
}

export default ReaderCustomization
