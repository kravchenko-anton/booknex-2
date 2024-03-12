import { useTypedNavigation, useTypedSelector } from '@/hooks'
import { Title } from '@/ui'
import { AnimatedView } from '@/ui/animated-components'
import type { FunctionType } from 'global/types'
import { ArrowLeft, CaseSenSitive, ListOrdered } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ReaderBar: FC<{
	title: string
	visible: boolean
	progress: number
	onChapterIconPress: FunctionType
	onSelectThemeIconPress: FunctionType
}> = ({
	visible = false,
	onChapterIconPress,
	onSelectThemeIconPress,
	title = '',
	progress = 0
}) => {
	const { colorScheme } = useTypedSelector(state => state.readingUi)
	const { goBack } = useTypedNavigation()
	const { top, bottom } = useSafeAreaInsets()

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
						<Title
							center
							size={'xl'}
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
			{/* //TODO: сделать нормальный прогресс бар с главой */}
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
						backgroundColor: colorScheme.colorPalette?.background?.lighter
					}}
				>
					<View
						className=' absolute bottom-0 left-0 h-0.5'
						style={{
							backgroundColor: colorScheme.colorPalette.primary,
							width: `${progress}%`
						}}
					/>
				</View>
			</View>
		</View>
	)
}

export default ReaderBar
