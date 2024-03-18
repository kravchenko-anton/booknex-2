import LineHeightIcon from '@/screens/reading/reader-customization/helpers/icons/line-height'
import { useReaderCustomization } from '@/screens/reading/reader-customization/reader-customization-context'
import type { FC } from 'react'
import { View } from 'react-native'

export const LineHeightSettings: FC = () => {
	const { colorScheme, lineHeight, changeLineHeight } = useReaderCustomization()
	return (
		<View className='mr-4 flex-row items-center'>
			<LineHeightIcon
				lineCount={3}
				backgroundColor={
					lineHeight === 1.8
						? colorScheme.colorPalette.primary
						: colorScheme.colorPalette.text
				}
				onPress={() => changeLineHeight(1.8)}
			/>
			<LineHeightIcon
				lineCount={4}
				className='mx-3'
				backgroundColor={
					lineHeight === 1.5
						? colorScheme.colorPalette.primary
						: colorScheme.colorPalette.text
				}
				onPress={() => changeLineHeight(1.5)}
			/>
			<LineHeightIcon
				lineCount={5}
				backgroundColor={
					lineHeight === 1.3
						? colorScheme.colorPalette.primary
						: colorScheme.colorPalette.text
				}
				onPress={() => changeLineHeight(1.3)}
			/>
		</View>
	)
}
