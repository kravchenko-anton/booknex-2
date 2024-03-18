import { ReaderFont } from '@/redux/reader/reading-settings-slice'
import { useReaderCustomization } from '@/screens/reading/reader-customization/reader-customization-context'
import { AnimatedPress, Title } from '@/ui'
import { cn } from '@/utils'
import { Color } from 'global/colors'
import { FlatList } from 'react-native-gesture-handler'

export const FontStyleSettings = () => {
	const { colorScheme, font, changeFontFamily } = useReaderCustomization()
	return (
		<FlatList
			horizontal
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
							font.fontFamily === item.value
								? colorScheme.colorPalette.secondary
								: Color.transparent
					}}
					className={cn(
						' mb-2 mr-2 rounded-lg border-2 border-transparent p-1 px-4',
						item.value === font.fontFamily && 'border-primary '
					)}
					onPress={() =>
						changeFontFamily({
							fontFamily: item.value,
							title: item.label
						})
					}
				>
					<Title
						weight='semiBold'
						size={'lg'}
						style={{
							color: colorScheme.colorPalette.text
						}}
					>
						{item.label}
					</Title>
				</AnimatedPress>
			)}
		/>
	)
}
