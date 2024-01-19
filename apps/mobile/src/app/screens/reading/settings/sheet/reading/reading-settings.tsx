import AnimatedPress from '@/components/animated-press/animated-press'
import { Title } from '@/components/ui'
import { useTypedSelector } from '@/hooks'
import { useAction } from '@/hooks/useAction'
import FontSettings from '@/screens/reading/settings/sheet/reading/font-settings/font-settings'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { Color } from 'global/colors'
import { ChevronRight } from 'icons'
import type { FC } from 'react'
import { Pressable } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

const ReadingSettings: FC<{
	openSelectTheme: () => void
}> = ({ openSelectTheme }) => {
	const { changeTheme } = useAction()
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	return (
		<Pressable>
			<FlatList
				className='mt-4'
				contentContainerStyle={{
					paddingHorizontal: 8
				}}
				showsHorizontalScrollIndicator={false}
				horizontal={true}
				ListFooterComponent={() => {
					return (
						<AnimatedPress
							key='other theme'
							style={{
								backgroundColor: Color.shade,
								borderColor: themePack
									.slice(1, 5)
									.map(theme => {
										console.log(theme.slug)
										return theme.slug
									})
									.includes(colorScheme.slug)
									? Color.transparent
									: Color.white
							}}
							onPress={openSelectTheme}
							className='mb-4 flex-row items-center justify-center rounded-xl border-2 p-2 px-4'
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
						</AnimatedPress>
					)
				}}
				data={themePack.slice(1, 5)}
				renderItem={({ item: theme }) => {
					return (
						<AnimatedPress
							key={`${theme.slug}-${theme.title}`}
							style={{
								backgroundColor: theme.colorPalette.background.darker,
								borderColor:
									colorScheme.slug === theme.slug
										? Color.primary
										: Color.transparent
							}}
							onPress={() => changeTheme(theme.slug)}
							className='mb-4 mr-2 rounded-xl border-2 p-2 px-6'
						>
							<Title
								weight='semiBold'
								size={18}
								style={{ color: theme.colorPalette.text }}
							>
								{theme.title}
							</Title>
						</AnimatedPress>
					)
				}}
			/>
			<FontSettings />
		</Pressable>
	)
}

export default ReadingSettings
