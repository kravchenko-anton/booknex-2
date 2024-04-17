import { ReaderFont } from '@/redux/reader/reading-settings-slice'
import type { ThemePackType } from '@/screens/reading/features/reader-styles/theme-pack'
import { AnimatedPress, Title } from '@/ui'
import { cn } from '@/utils'
import { Color } from 'global/colors'
import { useRef, type FC } from 'react'
import { FlatList } from 'react-native-gesture-handler'

interface FontStyleSettingsProperties {
	activeFont: {
		fontFamily: string
		title: string
	}
	changeFontFamily: (font: { fontFamily: string; title: string }) => void
	colorScheme: ThemePackType
}
export const FontStyleSettings: FC<FontStyleSettingsProperties> = ({
	activeFont,
	changeFontFamily,
	colorScheme
}) => {
	const reference = useRef<FlatList>(null)
	return (
		<FlatList
			horizontal
			ref={reference}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				paddingHorizontal: 8
			}}
			data={ReaderFont.map(font => ({
				value: font.fontFamily,
				label: font.title
			}))}
			renderItem={({ item }) => (
				<AnimatedPress
					style={{
						backgroundColor: colorScheme.colorPalette.background.lighter,
						borderColor:
							activeFont.fontFamily === item.value
								? colorScheme.colorPalette.secondary
								: Color.transparent
					}}
					className={cn(
						' mb-2 mr-2 rounded border-[1px] border-transparent p-1 px-4',
						item.value === activeFont.fontFamily && 'border-primary '
					)}
					onPress={() =>
						changeFontFamily({
							fontFamily: item.value,
							title: item.label
						})
					}>
					<Title
						weight='semiBold'
						size={'lg'}
						style={{
							color: colorScheme.colorPalette.text
						}}>
						{item.label}
					</Title>
				</AnimatedPress>
			)}
			onLayout={() => {
				reference.current?.scrollToIndex({
					index: ReaderFont.findIndex(
						font => font.fontFamily === activeFont.fontFamily
					),
					viewPosition: 0.5,
					animated: true
				})
			}}
		/>
	)
}
