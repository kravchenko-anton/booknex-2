import { useTypedNavigation } from '@/hooks'
import type { ReadingProgressType } from '@/screens/reading/hooks/useReadingProgress'
import type { ThemePackType } from '@/screens/reading/reader-customization/theme-pack'
import { AnimatedView } from '@/ui/animated-components'
import Slider from '@react-native-community/slider'
import type { FunctionType } from 'global/types'
import { ArrowLeft, CaseSensitive, ListOrdered, NotePen } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ReaderMenuProperties {
	visible: boolean
	onChapterIconPress: FunctionType
	onSelectThemeIconPress: FunctionType
	colorScheme: ThemePackType
	readingProgress: ReadingProgressType
	onProgressChange: (value: number) => void
}
// Переиминовать на readerMenu
const ReaderMenu: FC<ReaderMenuProperties> = ({
	visible = false,
	onChapterIconPress,
	colorScheme,
	readingProgress,
	onProgressChange,
	onSelectThemeIconPress
}) => {
	const { navigate } = useTypedNavigation()
	const { top } = useSafeAreaInsets()
	const fadeAnimation = useAnimatedStyle(() => ({
		opacity: withTiming(Boolean(visible) ? 1 : 0, { duration: 200 })
	}))

	console.log(readingProgress.progress, 'readingProgress.progress / 100')
	return (
		<View className='absolute h-screen w-full'>
			<AnimatedView
				className=' absolute z-50 mb-0 mt-0 w-full flex-1 justify-center border-b-2'
				style={[
					fadeAnimation,
					{
						top,
						backgroundColor: colorScheme.colorPalette.background.darker,
						borderBottomColor: colorScheme.colorPalette.background.lighter
					}
				]}>
				<View className='mt-0 w-full flex-row items-center justify-between px-4 pb-2.5 pt-2.5'>
					<View className='w-2/3 flex-row items-center'>
						<ArrowLeft
							width={28}
							height={28}
							color={colorScheme.colorPalette.text}
							onPress={() => navigate('Library')}
						/>
					</View>
					<View className='flex-row items-center gap-6'>
						<NotePen
							width={24}
							height={24}
							color={colorScheme.colorPalette.text}
							onPress={onChapterIconPress}
						/>
						<ListOrdered
							width={28}
							height={28}
							color={colorScheme.colorPalette.text}
							onPress={onChapterIconPress}
						/>
						<CaseSensitive
							width={28}
							height={28}
							color={colorScheme.colorPalette.text}
							onPress={onSelectThemeIconPress}
						/>
					</View>
				</View>
			</AnimatedView>

			<AnimatedView
				className='absolute z-50 w-full flex-1 justify-center border-t-2 pb-2 pt-2'
				style={[
					fadeAnimation,
					{
						bottom: 0,
						backgroundColor: colorScheme.colorPalette.background.darker,
						borderTopColor: colorScheme.colorPalette.background.lighter
					}
				]}>
				{/*TODO: сделать при переходах запись в стор и возможность вернутся позже к конкретному месту*/}
				{/*TODO: мигрировать на  https://www.npmjs.com/package/react-native-awesome-slider и добавить шаги и метки мжду глававми*/}
				<Slider
					minimumValue={0.1}
					maximumValue={1}
					step={0.001}
					minimumTrackTintColor={colorScheme.colorPalette.primary}
					thumbTintColor={colorScheme.colorPalette.primary}
					maximumTrackTintColor={colorScheme.colorPalette.background.lighter}
					value={readingProgress.progress / 100}
					onSlidingComplete={onProgressChange}
				/>
				{/*TODO: Сделать текст нормально  с отображением прогресса и сколько осталось чтобы дочитать */}
			</AnimatedView>
		</View>
	)
}

export default ReaderMenu
