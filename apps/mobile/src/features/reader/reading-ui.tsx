import { useTypedNavigation } from '@/hooks'
import { Title } from '@/ui'
import { AnimatedView } from '@/ui/animated-components'
import { ArrowLeft, CaseSenSitive, ListOrdered } from 'icons'
import type { FC } from 'react'
import { memo } from 'react'
import { View } from 'react-native'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ReadingUi: FC<{
	title: string
	visible: boolean
	progress: number
	onChapterIconPress: () => void
	onSelectThemeIconPress: () => void
	colorPalette: any
}> = ({
	visible = false,
	colorPalette = {},
	onChapterIconPress,
	onSelectThemeIconPress,
	title = '',
	progress = 0
}) => {
	const { goBack } = useTypedNavigation()
	const { top, bottom } = useSafeAreaInsets()
	const opacityAnimation = useAnimatedStyle(() => ({
		opacity: withTiming(visible ? 1 : 0)
	}))

	return (
		<View className='absolute h-screen w-full'>
			<AnimatedView
				className=' absolute z-50 mb-0 mt-0 w-full flex-1 justify-center border-b-2'
				style={[
					opacityAnimation,
					{
						top,
						backgroundColor: colorPalette.background.darker,
						borderBottomColor: colorPalette.background.lighter
					}
				]}
			>
				<View className='mt-0 w-full flex-row items-center justify-between px-4 pb-2.5 pt-2.5'>
					<View className='w-2/3 flex-row items-center'>
						<ArrowLeft
							width={28}
							height={28}
							color={colorPalette.text}
							onPress={() => goBack()}
						/>
						<Title
							center
							size={20}
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
						onPress={onChapterIconPress}
					/>
					<CaseSenSitive
						width={28}
						height={28}
						color={colorPalette.text}
						onPress={onSelectThemeIconPress}
					/>
				</View>
			</AnimatedView>

			<View
				className='absolute'
				style={{
					bottom: bottom,
					left: 0,
					right: 0,
					zIndex: 50
				}}
			>
				<View
					className='relative w-full'
					style={{
						backgroundColor: colorPalette.background.lighter
					}}
				>
					<View
						className=' absolute bottom-0 left-0 h-1'
						style={{
							backgroundColor: colorPalette.primary,
							width: `${progress}%`,
							borderBottomRightRadius: 100,
							borderTopRightRadius: 100
						}}
					/>
				</View>
			</View>
		</View>
	)
}

export default memo(ReadingUi)