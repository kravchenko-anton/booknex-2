import { useTypedNavigation } from '@/hooks'
import { useReader } from '@/screens/reading/reader-context'
import { AnimatedView } from '@/ui/animated-components'
import ProgressBar from '@/ui/progress-bar/progress-bar'
import type { FunctionType } from 'global/types'
import { ArrowLeft, CaseSenSitive, ListOrdered } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ReaderMenuProperties {
	visible: boolean
	onChapterIconPress: FunctionType
	onSelectThemeIconPress: FunctionType
}

const ReaderMenu: FC<ReaderMenuProperties> = ({
	visible = false,
	onChapterIconPress,
	onSelectThemeIconPress
}) => {
	const { colorScheme, progress } = useReader()
	const { goBack } = useTypedNavigation()
	const { top } = useSafeAreaInsets()
	return (
		<View className='absolute h-screen w-full'>
			<AnimatedView
				className=' absolute z-50 mb-0 mt-0 w-full flex-1 justify-center border-b-2'
				style={[
					visible ? { display: 'flex' } : { display: 'none' },
					{
						top,
						backgroundColor: colorScheme.colorPalette?.background?.darker,
						borderBottomColor: colorScheme.colorPalette?.background?.lighter
					}
				]}
			>
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
								progress={progress.chapterProgress / 100}
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
					<CaseSenSitive
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

export default ReaderMenu
