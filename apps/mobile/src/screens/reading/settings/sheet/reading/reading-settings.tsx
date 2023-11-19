import PressableContainer from '@/components/pressable-container/pressable-container'
import { BottomSheetListEnum } from '@/components/ui/bottom-sheet/bottom-sheet-list'
import Icon from '@/components/ui/icon/icon'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import FontSettings from '@/screens/reading/settings/sheet/reading/font-settings/font-settings'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { shadeRGBColor } from '@/utils/shade-color'
import type { FC } from 'react'
import { View } from 'react-native'

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
									backgroundColor: theme.colorPalette.background,
									borderColor:
										colorScheme.slug === theme.slug
											? colorScheme.colorPalette.text
											: theme.colorPalette.background
								}}
								onPress={() => changeTheme(theme.slug)}
								className='rounded-xl border-2 p-2 px-4'>
								<Title
									weight={'semiBold'}
									size={18}
									style={{ color: theme.colorPalette.text }}>
									{theme.title}
								</Title>
							</PressableContainer>
						)
					}),
					<PressableContainer
						key={'other theme'}
						style={{
							backgroundColor: shadeRGBColor(
								colorScheme.colorPalette.background,
								-15
							)
						}}
						onPress={() =>
							openBottomSheet(BottomSheetListEnum.readerSelectTheme)
						}
						className='flex-row items-center rounded-xl p-2 px-4'>
						<Title
							color={colorScheme.colorPalette.text}
							weight={'semiBold'}
							size={18}>
							{'Other'}
						</Title>
						<Icon
							noPadding
							name='chevron-right'
							size='medium'
							className='ml-2 h-6 w-3.5'
							color={colorScheme.colorPalette.text}
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
