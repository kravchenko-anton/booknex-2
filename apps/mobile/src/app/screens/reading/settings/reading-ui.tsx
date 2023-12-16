import { AnimatedIcon, Title } from '@/components'
import { AnimatedView } from '@/components/animated'
import { BottomSheetListEnum } from '@/components/ui/bottom-sheet/bottom-sheet-list/bottom-sheet-list-types'
import { useAction, useTypedNavigation, useTypedSelector } from '@/hooks'
import { useReadingAnimation } from '@/screens/reading/settings/reading-ui-animation'
import { ArrowLeft, BookHeart, CaseSenSitive, ListOrdered, MoreHorizontal, Search } from 'global/icons/react-native'
import { shadeRGBColor } from 'global/utils/shade-color'
import type { FC } from 'react'
import { StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { LineColorType } from 'ui/colors'

export const shadeBackground = -15
const ReadingUi: FC = () => {
	const { goBack } = useTypedNavigation()
	const { top } = useSafeAreaInsets()
	const { openBottomSheet } = useAction()
	const { progress: readerProgress } = useTypedSelector(state => state.reader)
	const { visible } = useTypedSelector(state => state.readingUi)
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const { headerAnimation, footerAnimation } = useReadingAnimation(visible)
	return (
		<View className="absolute h-screen w-full">
			<AnimatedView
				style={[
					{
						top
					},
					headerAnimation
				]}
				className="absolute z-50 h-[65px] w-full flex-row items-center justify-between px-2"
			>
				<AnimatedIcon
					icon={ArrowLeft}
					backgroundColor={
						shadeRGBColor(
							colorScheme.colorPalette.background,
							shadeBackground
						) as LineColorType
					}
					size="medium"
					className="w-[50px]"
					onPress={() => goBack()}
					color={colorScheme.colorPalette.text}
				/>
				<AnimatedIcon
					icon={MoreHorizontal}
					backgroundColor={shadeRGBColor(
						colorScheme.colorPalette.background,
						shadeBackground
					)}
					className="w-[50px]"
					size="medium"
					color={colorScheme.colorPalette.text as LineColorType}
				/>
			</AnimatedView>
			
			<AnimatedView
				style={[
					footerAnimation,
					{
						backgroundColor: shadeRGBColor(
							colorScheme.colorPalette.background,
							shadeBackground
						)
					}
				]}
				className="h-18 absolute bottom-0 z-50 mt-0 w-full flex-1 pt-0"
			>
				<View className="mt-0 flex-row items-center justify-between  px-4">
					<AnimatedIcon
						icon={ListOrdered}
						onPress={() => openBottomSheet(BottomSheetListEnum.readerChapters)}
						size="large"
						color={colorScheme.colorPalette.text}
						className="pl-0"
					/>
					<AnimatedIcon
						icon={Search}
						size="large"
						onPress={() => openBottomSheet(BottomSheetListEnum.readerSearch)}
						color={colorScheme.colorPalette.text}
					/>
					<Title
						size={24}
						center
						weight="bold"
						color={colorScheme.colorPalette.primary}
					>
						{(readerProgress || 0) + '%'}
					</Title>
					<AnimatedIcon
						onPress={() => openBottomSheet(BottomSheetListEnum.readerSettings)}
						icon={CaseSenSitive}
						size="large"
						color={colorScheme.colorPalette.text}
					/>
					<AnimatedIcon
						icon={BookHeart}
						size="large"
						onPress={() => openBottomSheet(BottomSheetListEnum.readerNoteBook)}
						className="pr-0"
						color={colorScheme.colorPalette.text}
					/>
				</View>
			</AnimatedView>
			<StatusBar
				barStyle={colorScheme.statusBar}
				backgroundColor={colorScheme.colorPalette.background}
			/>
		</View>
	)
}

export default ReadingUi
