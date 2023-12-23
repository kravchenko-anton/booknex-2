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
	const { top } = useSafeAreaInsets()
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
				<AnimatedIcon
					icon={ArrowLeft}
					size='md'
					className='w-[50px]'
					onPress={() => goBack()}
				/>
				<AnimatedIcon icon={MoreHorizontal} className='w-[50px]' size='md' />
			</AnimatedView>

			<AnimatedView
				style={[
					footerAnimation,
					{
						backgroundColor: colorScheme.colorPalette.background.normal
					}
				]}
				className='h-18 absolute bottom-0 z-50 mt-0 w-full flex-1 pt-0'
			>
				<View className='mt-0 flex-row items-center justify-between  px-4'>
					<AnimatedIcon
						icon={ListOrdered}
						onPress={() => openBottomSheet(BottomSheetListEnum.readerChapters)}
						size='lg'
						className='pl-0'
					/>
					<AnimatedIcon
						icon={Search}
						size='lg'
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
						size='lg'
					/>
					<AnimatedIcon
						icon={BookHeart}
						size='lg'
						onPress={() => openBottomSheet(BottomSheetListEnum.readerNoteBook)}
						className='pr-0'
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
