import AnimatedPress from '@/components/animated-press/animated-press'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import type { FC } from 'react'
import { View } from 'react-native'
import { Title } from 'ui/components'

const SelectTheme: FC = () => {
	const { changeTheme } = useAction()
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	return (
		<BottomSheetFlatList
			showsVerticalScrollIndicator={false}
			data={themePack}
			style={{
				paddingHorizontal: 14
			}}
			renderItem={({ item: theme }) => {
				return (
					<AnimatedPress
						onPress={() => changeTheme(theme.slug)}
						style={{
							borderColor:
								colorScheme.slug === theme.slug
									? colorScheme.colorPalette.text
									: theme.colorPalette.background.normal,
							backgroundColor: theme.colorPalette.background.normal
						}}
						className='mb-8 flex-row items-center justify-between rounded-xl border-2 p-4'
					>
						<Title
							style={{
								color: theme.colorPalette.text
							}}
							weight='bold'
							size={22}
						>
							{theme.title}
						</Title>
						<View className='flex-row items-center'>
							{Object.values(theme.colorPalette).map(background => {
								if (typeof background !== 'string')
									return (
										<View
											key={background.normal}
											style={{
												backgroundColor: background.normal
											}}
											className='ml-[-8px] h-8 w-8 rounded-full'
										/>
									)
							})}
						</View>
					</AnimatedPress>
				)
			}}
		/>
	)
}

export default SelectTheme
