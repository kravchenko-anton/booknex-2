import { AnimatedView } from '@/components/animated'
import { useTypedNavigation, useTypedSelector } from '@/hooks'
import { BottomSheetContext } from '@/providers/bottom-sheet-provider'
import ChaptersList from '@/screens/reading/settings/sheet/chapters-list/chapters-list'
import ReadingSettings from '@/screens/reading/settings/sheet/reading/reading-settings'
import { WINDOW_HEIGHT } from '@/utils/dimensions'
import { ArrowLeft, CaseSenSitive, ListOrdered } from 'icons'
import type { FC } from 'react'
import { useContext } from 'react'
import { StatusBar, View } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Title } from 'ui/components'

const ReadingUi: FC<{
	title: string
	visible: boolean
	progress: number
	goToChapter: (chapterId: string) => void
	chapters: {
		name: string
		children: {
			name: string
			link: string
		}[]
	}[]
}> = ({
	visible = false,
	title = '',
	goToChapter,
	progress = 0,
	chapters = []
}) => {
	const { goBack } = useTypedNavigation()
	const { bottom } = useSafeAreaInsets()
	//TODO: вынести в рут компонентготовые функции для иконок с логикой без лишних пропсов, так-же и с цветовой схемой
	const { showBottomSheet } = useContext(BottomSheetContext)
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
							width: `${progress}%`,
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
						onPress={() =>
							showBottomSheet({
								component: (
									<ChaptersList chapters={chapters} goToChapter={goToChapter} />
								),
								snapPoints: [WINDOW_HEIGHT / 2, WINDOW_HEIGHT / 1.4]
							})
						}
					/>
					<CaseSenSitive
						onPress={() =>
							showBottomSheet({
								component: <ReadingSettings />,
								snapPoints: [230, 230]
							})
						}
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
