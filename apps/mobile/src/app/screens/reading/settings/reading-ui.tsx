import { AnimatedView } from '@/components/animated'
import { BottomSheetListEnum } from '@/components/bottom-sheet/bottom-sheet-list/types'
import { useAction, useTypedNavigation, useTypedSelector } from '@/hooks'
import { ArrowLeft, CaseSenSitive, ListOrdered } from 'icons'
import type { FC } from 'react'
import { StatusBar, View } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Title } from 'ui/components'

const ReadingUi: FC<{ title: string }> = ({ title }) => {
	const { goBack } = useTypedNavigation()
	const { bottom } = useSafeAreaInsets()
	const { progress } = useTypedSelector(state => state.reader)
	const { openBottomSheet } = useAction()
	const { visible } = useTypedSelector(state => state.readingUi)
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const showAnimation = useAnimatedStyle(() => {
		return {
			opacity: withTiming(visible ? 1 : 0),
			bottom: bottom
		}
	})
	return (
		<View className='absolute h-screen w-full'>
			<AnimatedView
				style={[
					showAnimation,
					{
						backgroundColor: colorScheme.colorPalette.background.normal
					}
				]}
				className=' absolute z-50 mb-0 mt-0 w-full flex-1 justify-center  pt-0'
			>
				<View
					className='relative h-1.5 w-full'
					style={{
						backgroundColor: colorScheme.colorPalette.background.lighter
					}}
				>
					<View
						className=' absolute left-0 h-1.5'
						style={{
							backgroundColor: colorScheme.colorPalette.primary,
							width: `${progress === 0 ? 1 : progress}%`,
							borderBottomRightRadius: 100,
							borderTopRightRadius: 100
						}}
					></View>
				</View>
				<View className='mt-0 w-full flex-row items-center justify-between px-4 pb-2.5 pt-1.5'>
					<View className='w-2/3 flex-row items-center'>
						<ArrowLeft
							width={28}
							height={28}
							color={colorScheme.colorPalette.text}
							onPress={() => goBack()}
						/>
						<Title
							size={20}
							center
							className='ml-2'
							weight='bold'
							color={colorScheme.colorPalette.text}
						>
							{title}
						</Title>
					</View>
					<ListOrdered
						width={28}
						height={28}
						color={colorScheme.colorPalette.text}
						onPress={() => openBottomSheet(BottomSheetListEnum.readerChapters)}
					/>
					<CaseSenSitive
						onPress={() => openBottomSheet(BottomSheetListEnum.readerSettings)}
						width={28}
						height={28}
						color={colorScheme.colorPalette.text}
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
