import { AnimatedView } from '@/components/animated'
import { Title } from '@/components/ui'
import { useTypedNavigation } from '@/hooks'
import { useReadingUIAnimation } from '@/screens/reading/settings/animation'
import type { ThemePackType } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { ArrowLeft, CaseSenSitive, ListOrdered } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ReadingUi: FC<{
	title: string
	openChapterList(): void
	openReadingSettings(): void
	colorPalette: ThemePackType['colorPalette']
	visible: boolean
	progress: number
}> = ({
	visible = false,
	colorPalette = {},
	openChapterList,
	openReadingSettings,
	title = '',
	progress = 0
}) => {
	const { goBack } = useTypedNavigation()
	const { bottom } = useSafeAreaInsets()
	const { opacityAnimation } = useReadingUIAnimation(visible)
	return (
		<View className='absolute h-screen w-full'>
			<AnimatedView
				style={[
					opacityAnimation,
					{
						bottom,
						backgroundColor: colorPalette.background.normal
					}
				]}
				className=' absolute z-50 mb-0 mt-0 w-full flex-1 justify-center  pt-0'
			>
				<View
					className='relative h-1.5 w-full'
					style={{
						backgroundColor: colorPalette.background.lighter
					}}
				>
					<View
						className=' absolute left-0 h-1.5'
						style={{
							backgroundColor: colorPalette.primary,
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
							color={colorPalette.text}
							onPress={() => goBack()}
						/>
						<Title
							size={20}
							center
							className='ml-2'
							weight='bold'
							color={colorPalette.text}
						>
							{title}
						</Title>
					</View>
					<ListOrdered
						width={28}
						height={28}
						color={colorPalette.text}
						onPress={openChapterList}
					/>
					<CaseSenSitive
						onPress={openReadingSettings}
						width={28}
						height={28}
						color={colorPalette.text}
					/>
				</View>
			</AnimatedView>
		</View>
	)
}

export default ReadingUi
