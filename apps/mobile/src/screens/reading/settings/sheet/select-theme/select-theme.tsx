import PressableContainer from '@/components/pressable-container/pressable-container'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
import type { FC } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const SelectTheme: FC = () => {
	const { changeTheme } = useAction()
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	return (
		<FlatList
			showsVerticalScrollIndicator={false}
			data={themePack}
			className='mt-2 h-full px-4'
			renderItem={({ item: theme }) => {
				return (
					<PressableContainer
						onPress={() => changeTheme(theme.slug)}
						style={{
							borderColor:
								colorScheme.slug === theme.slug
									? colorScheme.colorPalette.text
									: theme.colorPalette.background,
							backgroundColor: theme.colorPalette.background
						}}
						className='mb-8 flex-row items-center justify-between rounded-xl border-2 p-4'>
						<Title
							style={{
								color: theme.colorPalette.text
							}}
							weight={'bold'}
							size={22}>
							{theme.title}
						</Title>
						<View className='flex-row items-center'>
							{Object.values(theme.colorPalette).map(color => {
								return (
									<View
										key={color}
										style={{
											backgroundColor: color
										}}
										className='ml-[-8px] h-8 w-8 rounded-full'
									/>
								)
							})}
						</View>
					</PressableContainer>
				)
			}}
		/>
	)
}

export default SelectTheme
