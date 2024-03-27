import LineHeightIcon from '@/screens/reading/reader-customization/helpers/icons/line-height'
import type { ThemePackType } from '@/screens/reading/reader-customization/helpers/theme-pack'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import type { FC } from 'react'
import { View } from 'react-native'

interface LineHeightSettingsProperties {
	lineHeight: number
	changeLineHeight: ActionCreatorWithPayload<
		1.3 | 1.5 | 1.8,
		'reading-ui/changeLineHeight'
	>
	colorScheme: ThemePackType
}
export const LineHeightSettings: FC<LineHeightSettingsProperties> = ({
	changeLineHeight,
	colorScheme,
	lineHeight
}) => (
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
