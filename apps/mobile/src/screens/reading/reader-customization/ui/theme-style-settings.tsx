import {
	themePack,
	type ThemePackType
} from '@/screens/reading/features/reader-styles/theme-pack'
import { AnimatedPress, Title } from '@/ui'
import { Color } from 'global/colors'
import type { FC } from 'react'
import { FlatList } from 'react-native-gesture-handler'

interface ThemeStyleSettingsProperties {
	changeTheme: (slug: string) => void
	colorScheme: ThemePackType
}
export const ThemeStyleSettings: FC<ThemeStyleSettingsProperties> = ({
	changeTheme,
	colorScheme
}) => (
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
				className='mb-4 mr-2 rounded border-[1px] p-1 px-6'
				style={{
					backgroundColor: theme.colorPalette.background.darker,
					borderColor:
						colorScheme.slug === theme.slug
							? colorScheme.colorPalette.primary
							: Color.transparent
				}}
				onPress={() => changeTheme(theme.slug)}>
				<Title
					weight='semiBold'
					size={'lg'}
					style={{ color: theme.colorPalette.text }}>
					{theme.title}
				</Title>
			</AnimatedPress>
		)}
	/>
)
