import { AnimatedView } from '@/components/animated'
import { BottomSheetListEnum } from '@/components/bottom-sheet/bottom-sheet-list/types'
import { useAction, useTypedNavigation, useTypedSelector } from '@/hooks'
import { useReadingAnimation } from '@/screens/reading/settings/reading-ui-animation'
import {
	ArrowLeft,
	BookHeart,
	CaseSenSitive,
	ListOrdered,
	MoreHorizontal,
	Search
} from 'icons'
import type { FC } from 'react'
import { StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AnimatedIcon, Title } from 'ui/components'

export const shadeBackground = -15
const ReadingUi: FC = () => {
	const { goBack } = useTypedNavigation()
	const { top, bottom } = useSafeAreaInsets()
	const { openBottomSheet } = useAction()
	const { progress: readerProgress } = useTypedSelector(state => state.reader)
	const { visible } = useTypedSelector(state => state.readingUi)
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const { headerAnimation, footerAnimation } = useReadingAnimation(visible)
	return (
		<View className='absolute h-screen w-full'>
			<AnimatedView
				style={[
					{
						top
					},
					headerAnimation
				]}
				className='absolute z-50 h-[65px] w-full flex-row items-center justify-between px-2'
			>
				<AnimatedIcon icon={ArrowLeft} size='md' onPress={() => goBack()} />
				<AnimatedIcon icon={MoreHorizontal} size='md' />
			</AnimatedView>

			<AnimatedView
				style={[
					footerAnimation,
					{
						bottom: bottom,
						backgroundColor: colorScheme.colorPalette.background.darker
					}
				]}
				className='absolute z-50 mt-0 h-14 w-full flex-1 justify-center pt-0'
			>
				<View className='mt-0 flex-row items-center justify-between  px-4'>
					<AnimatedIcon
						icon={ListOrdered}
						onPress={() => openBottomSheet(BottomSheetListEnum.readerChapters)}
						size='md'
					/>
					<AnimatedIcon
						icon={Search}
						size='md'
						onPress={() => openBottomSheet(BottomSheetListEnum.readerSearch)}
					/>
					<Title
						size={24}
						center
						weight='bold'
						color={colorScheme.colorPalette.primary}
					>
						{(readerProgress || 0) + '%'}
					</Title>
					<AnimatedIcon
						onPress={() => openBottomSheet(BottomSheetListEnum.readerSettings)}
						icon={CaseSenSitive}
						size='md'
					/>
					<AnimatedIcon
						icon={BookHeart}
						size='md'
						onPress={() => openBottomSheet(BottomSheetListEnum.readerNoteBook)}
					/>
				</View>
			</AnimatedView>
			<StatusBar
				barStyle={colorScheme.statusBar}
				backgroundColor={colorScheme.colorPalette.background.normal}
			/>
		</View>
	)
}

export default ReadingUi
