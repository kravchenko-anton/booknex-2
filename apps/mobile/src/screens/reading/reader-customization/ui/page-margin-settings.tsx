import type { ThemePackType } from '@/screens/reading/features/reader-styles/theme-pack'
import PageMarginIcon from '@/screens/reading/reader-customization/ui/icons/page-margin'
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import type { FC } from 'react'
import { View } from 'react-native'

interface PageMarginSettingsProperties {
	padding: number
	changePadding: ActionCreatorWithPayload<
		4 | 14 | 20,
		'readingUi/changePadding'
	>
	colorScheme: ThemePackType
}

export const PageMarginSettings: FC<PageMarginSettingsProperties> = ({
	changePadding,
	padding,
	colorScheme
}) => (
	<View className='ml-4 flex-row items-center'>
		<PageMarginIcon
			className='p-1  pb-0.5'
			backgroundColor={
				padding === 4
					? colorScheme.colorPalette.primary
					: colorScheme.colorPalette.text
			}
			onPress={() => changePadding(4)}
		/>
		<PageMarginIcon
			className='mx-3 p-1.5  pb-0.5'
			backgroundColor={
				padding === 14
					? colorScheme.colorPalette.primary
					: colorScheme.colorPalette.text
			}
			onPress={() => changePadding(14)}
		/>
		<PageMarginIcon
			className='p-2 pb-0.5'
			backgroundColor={
				padding === 20
					? colorScheme.colorPalette.primary
					: colorScheme.colorPalette.text
			}
			onPress={() => changePadding(20)}
		/>
	</View>
)
