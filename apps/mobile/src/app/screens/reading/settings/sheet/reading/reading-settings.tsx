import PressableContainer from '@/components/animated-press/animated-press'
import { BottomSheetListEnum } from '@/components/bottom-sheet/bottom-sheet-list/types'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import FontSettings from '@/screens/reading/settings/sheet/reading/font-settings/font-settings'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { ChevronRight } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'
import { Title } from 'ui/components'

const ReadingSettings: FC = () => {
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const { changeTheme, openBottomSheet } = useAction()
	return (
		<View className='px-6'>
			<View className='mt-4 flex-row items-center justify-between'>
				{[
					...themePack.slice(1, 3).map(theme => {
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
								className='xler-2 mx-1 rounded-xl p-2 px-6'
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
						className='flex-row items-center justify-center rounded-xl p-2 px-4'
					>
						<Title
							color={colorScheme.colorPalette.text}
							weight='semiBold'
							size={18}
						>
							Other
						</Title>
						<ChevronRight
							width={25}
							height={25}
							color={colorScheme.colorPalette.text}
							className='ml-2 mt-1'
						/>
					</PressableContainer>
				]}
			</View>
			<FontSettings />
		</View>
	)
}

export default ReadingSettings
