import PressableContainer from '@/components/animated-press/animated-press'
import { BottomSheetListEnum } from '@/components/bottom-sheet/bottom-sheet-list/types'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import FontSettings from '@/screens/reading/settings/sheet/reading/font-settings/font-settings'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { ChevronRight } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { Icon, Title } from 'ui/components'

const ReadingSettings: FC = () => {
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const { changeTheme, openBottomSheet } = useAction()
	return (
		<View className='px-6'>
			<View className='mt-4 flex-row items-center justify-between'>
				{[
					...themePack.slice(0, 3).map(theme => {
						return (
							<PressableContainer
								key={`${theme.slug}-${theme.title}`}
								style={{
									backgroundColor: theme.colorPalette.background.normal,
									borderColor:
										colorScheme.slug === theme.slug
											? colorScheme.colorPalette.text
											: theme.colorPalette.background.lighter
								}}
								onPress={() => changeTheme(theme.slug)}
								className='rounded-md border-2 p-2 px-4'
							>
								<Title
									weight='semiBold'
									size={18}
									style={{ color: theme.colorPalette.text }}
								>
									{theme.title}
								</Title>
							</PressableContainer>
						)
					}),
					<PressableContainer
						key='other theme'
						style={{
							backgroundColor: colorScheme.colorPalette.background.darker
						}}
						onPress={() =>
							openBottomSheet(BottomSheetListEnum.readerSelectTheme)
						}
						className='flex-row items-center rounded-md p-2 px-4'
					>
						<Title
							color={colorScheme.colorPalette.text}
							weight='semiBold'
							size={18}
						>
							Other
						</Title>
						<Icon
							noPadding
							icon={ChevronRight}
							size='md'
							className='ml-2 h-6 w-3.5'
						/>
					</PressableContainer>
				]}
			</View>
			<FontSettings />
			{/* <View className='mt-4 flex-row items-center justify-center'>*/}
			{/*	<Title weight={'bold'} color={colorScheme.colorPalette.text}>*/}
			{/*		Scrolling*/}
			{/*	</Title>*/}

			{/*	<Switch*/}
			{/*		className='m-0 ml-3 mt-1.5 p-0'*/}
			{/*		trackColor={{*/}
			{/*			false: colorScheme.colorPalette.text,*/}
			{/*			true: shadeRGBColor(colorScheme.colorPalette.primary, -10)*/}
			{/*		}}*/}
			{/*		thumbColor={*/}
			{/*			flow === 'paginated'*/}
			{/*				? colorScheme.colorPalette.text*/}
			{/*				: colorScheme.colorPalette.primary*/}
			{/*		}*/}
			{/*		onValueChange={() => {*/}
			{/*			console.log(flow)*/}
			{/*			changeFlow(flow === 'paginated' ? 'scrolled' : 'paginated')*/}
			{/*		}}*/}
			{/*		value={flow !== 'paginated'}*/}
			{/*	/>*/}
			{/* </View>*/}
		</View>
	)
}

export default ReadingSettings
