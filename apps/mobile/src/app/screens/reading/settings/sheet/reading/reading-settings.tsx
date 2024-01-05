import PressableContainer from '@/components/animated-press/animated-press'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { BottomSheetContext } from '@/providers/bottom-sheet-provider'
import FontSettings from '@/screens/reading/settings/sheet/reading/font-settings/font-settings'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
import SelectTheme from '@/screens/reading/settings/sheet/select-theme/select-theme'
import { WINDOW_HEIGHT } from '@/utils/dimensions'
import { ChevronRight } from 'icons'
import type { FC } from 'react'
import { useContext } from 'react'
import { Pressable, View } from 'react-native'
import { Color } from 'ui/colors'
import { Title } from 'ui/components'

const ReadingSettings: FC = () => {
	const { showBottomSheet } = useContext(BottomSheetContext)
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const { changeTheme } = useAction()
	return (
		<Pressable className='h-full w-full flex-1 px-6'>
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
											? Color.white
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
							backgroundColor: Color.shade
						}}
						onPress={() =>
							showBottomSheet({
								component: <SelectTheme />,
								snapPoints: [WINDOW_HEIGHT / 2, WINDOW_HEIGHT / 1.4]
							})
						}
						className='flex-row items-center justify-center rounded-xl p-2 px-4'
					>
						<Title color={Color.white} weight='semiBold' size={18}>
							Other
						</Title>
						<ChevronRight
							width={25}
							height={25}
							color={Color.white}
							className='ml-2 mt-1'
						/>
					</PressableContainer>
				]}
			</View>
			<FontSettings />
		</Pressable>
	)
}

export default ReadingSettings
