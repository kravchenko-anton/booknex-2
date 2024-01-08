import AnimatedPress from '@/components/animated-press/animated-press'
import { useAction } from '@/hooks/useAction'
import FontSettings from '@/screens/reading/settings/sheet/reading/font-settings/font-settings'
import { themePack } from '@/screens/reading/settings/sheet/reading/theme-pack'
import { ChevronRight } from 'icons'
import type { FC } from 'react'
import { Pressable, View } from 'react-native'
import { Color } from 'ui/colors'
import { Title } from 'ui/components'

const ReadingSettings: FC<{
	openSelectTheme: () => void
	activeThemeSlug: string
}> = ({ openSelectTheme, activeThemeSlug }) => {
	const { changeTheme } = useAction()
	return (
		<Pressable className='h-full w-full flex-1 px-6'>
			<View className='mt-4 flex-row items-center justify-between'>
				{[
					...themePack.slice(1, 3).map(theme => {
						return (
							<AnimatedPress
								key={`${theme.slug}-${theme.title}`}
								style={{
									//TODO: пофиксить отображение
									backgroundColor: theme.colorPalette.background.normal,
									borderColor:
										activeThemeSlug === theme.slug
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
							</AnimatedPress>
						)
					}),
					<AnimatedPress
						key='other theme'
						style={{
							backgroundColor: Color.shade,
							borderColor: themePack
								.slice(1, 3)
								.map(theme => theme.slug)
								.includes(activeThemeSlug)
								? Color.white
								: Color.shade
						}}
						onPress={openSelectTheme}
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
					</AnimatedPress>
				]}
			</View>
			<FontSettings />
		</Pressable>
	)
}

export default ReadingSettings
