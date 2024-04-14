import { useTypedNavigation } from '@/hooks'
import type { ThemePackType } from '@/screens/reading/features/reader-styles/theme-pack'
import { AnimatedView } from '@/ui/animated-components'
import ProgressBar from '@/ui/progress-bar/progress-bar'
import type { FunctionType } from 'global/types'
import { ArrowLeft, CaseSensitive, ListOrdered } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ReaderMenuProperties {
	visible: boolean
	onChapterIconPress: FunctionType
	onSelectThemeIconPress: FunctionType
	colorScheme: ThemePackType
	progress: {
		bookProgress: number
		chapterProgress: number
	}
}

const ReaderHeader: FC<ReaderMenuProperties> = ({
	visible = false,
	onChapterIconPress,
	colorScheme,
	progress,
	onSelectThemeIconPress
}) => {
	const { goBack } = useTypedNavigation()
	const { top } = useSafeAreaInsets()
	const fadeAnimation = useAnimatedStyle(() => ({
		opacity: withTiming(Boolean(visible) ? 1 : 0, { duration: 200 })
	}))
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
							onPress={() => goBack()}
						/>
						<View className='ml-auto w-1/2'>
							<ProgressBar
								className='mb-1.5'
								tintColor={colorScheme.colorPalette.secondary}
								trackTintColor={colorScheme.colorPalette.background.lighter}
								progress={(progress.chapterProgress || 0) / 100}
							/>
							<ProgressBar
								tintColor={colorScheme.colorPalette.primary}
								trackTintColor={colorScheme.colorPalette.background.lighter}
								progress={progress.bookProgress / 100}
							/>
						</View>
					</View>
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
			</AnimatedView>
		</View>
	)
}

export default ReaderHeader
