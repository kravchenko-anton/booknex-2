import { useTypedNavigation } from '@/hooks'
import type { ReadingProgressType } from '@/screens/reading/hooks/useReadingProgress'
import type { ThemePackType } from '@/screens/reading/reader-customization/theme-pack'
import { AnimatedView } from '@/ui/animated-components'
import ProgressBar from '@/ui/progress-bar/progress-bar'
import { screenHeight, windowHeight } from '@/utils/dimensions'
import Slider from '@react-native-community/slider'
import type { FunctionType } from 'global/types'
import { ArrowLeft, CaseSensitive, ListOrdered } from 'icons'
import type { FC } from 'react'
import { StatusBar, View } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ReaderMenuProperties {
	visible: boolean
	onChapterIconPress: FunctionType
	onSelectThemeIconPress: FunctionType
	colorScheme: ThemePackType
	readingProgress: ReadingProgressType
}

const navbarHeight =
	screenHeight - windowHeight + (StatusBar.currentHeight || 24)
const ReaderHeader: FC<ReaderMenuProperties> = ({
	visible = false,
	onChapterIconPress,
	colorScheme,
	readingProgress,
	onSelectThemeIconPress
}) => {
	const { navigate } = useTypedNavigation()
	const { top } = useSafeAreaInsets()
	const fadeAnimation = useAnimatedStyle(() => ({
		opacity: withTiming(Boolean(visible) ? 1 : 0, { duration: 200 })
	}))
	console.log(StatusBar.currentHeight)
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
						<View className='ml-auto w-1/2'>
							<ProgressBar
								className='mb-1.5'
								tintColor={colorScheme.colorPalette.secondary}
								trackTintColor={colorScheme.colorPalette.background.lighter}
								progress={(readingProgress.chapter.progress || 0) / 100}
							/>
							<ProgressBar
								tintColor={colorScheme.colorPalette.primary}
								trackTintColor={colorScheme.colorPalette.background.lighter}
								progress={readingProgress.progress / 100}
							/>
						</View>
					</View>
					<View className='flex-row items-center gap-6'>
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
				className='absolute z-50 mb-0 mt-0 w-full flex-1 justify-center border-t-2'
				style={[
					fadeAnimation,
					{
						bottom: 0,
						backgroundColor: colorScheme.colorPalette.background.darker,
						borderTopColor: colorScheme.colorPalette.background.lighter
					}
				]}>
				<Slider
					style={{ width: 200, height: 40 }}
					minimumValue={0}
					value={10}
					maximumValue={1}
					minimumTrackTintColor='#FFFFFF'
					maximumTrackTintColor='#000000'
				/>
			</AnimatedView>
		</View>
	)
}

export default ReaderHeader
