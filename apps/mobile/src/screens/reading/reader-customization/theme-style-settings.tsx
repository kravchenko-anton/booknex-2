import { themePack } from '@/screens/reading/reader-customization/helpers/theme-pack'
import { useReaderCustomization } from '@/screens/reading/reader-customization/reader-customization-context'
import { AnimatedPress, Title } from '@/ui'
import { Color } from 'global/colors'
import { FlatList } from 'react-native-gesture-handler'

export const ThemeStyleSettings = () => {
	const { colorScheme, changeTheme } = useReaderCustomization()
	return (
		<FlatList
			horizontal
			className='mt-4'
			showsHorizontalScrollIndicator={false}
			data={themePack}
			contentContainerStyle={{
				paddingHorizontal: 8
			}}
			renderItem={({ item: theme }) => (
				<AnimatedPress
					key={`${theme.slug}-${theme.title}`}
					className='mb-4 mr-2 rounded-lg border-2 p-1 px-6'
					style={{
						backgroundColor: theme.colorPalette.background.darker,
						borderColor:
							colorScheme.slug === theme.slug
								? colorScheme.colorPalette.primary
								: Color.transparent
					}}
					onPress={() => changeTheme(theme.slug)}
				>
					<Title
						weight='semiBold'
						size={'lg'}
						style={{ color: theme.colorPalette.text }}
					>
						{theme.title}
					</Title>
				</AnimatedPress>
			)}
		/>
	)
}
