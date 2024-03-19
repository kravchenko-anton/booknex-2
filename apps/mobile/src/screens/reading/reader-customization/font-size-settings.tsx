import { fontSizeSettings } from '@/redux/reader/reading-settings-slice'
import type { ThemePackType } from '@/screens/reading/reader-customization/helpers/theme-pack'
import { Title } from '@/ui'
import { Minus, Plus } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler'

interface FontSizeSettingsProperties {
	activeFontSize: number
	changeFontSize: (size: number) => void
	colorScheme: ThemePackType
}
export const FontSizeSettings: FC<FontSizeSettingsProperties> = ({
	changeFontSize,
	activeFontSize,
	colorScheme
}) => (
	<View className='my-1.5 flex-row items-center justify-between px-3'>
		<Title weight='semiBold' size={'xxl'} color={colorScheme.colorPalette.text}>
			Font size
		</Title>
		<View className='flex-row items-center'>
			<TouchableOpacity
				className='rounded-l-lg p-1 px-4'
				disabled={activeFontSize === fontSizeSettings.min}
				style={{
					backgroundColor:
						activeFontSize === fontSizeSettings.min
							? colorScheme.colorPalette.background.normal
							: colorScheme.colorPalette.background.lighter
				}}
				onPress={() => changeFontSize(activeFontSize - 2)}
			>
				<Minus
					width={30}
					color={colorScheme.colorPalette.text}
					strokeWidth={2}
					height={30}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				className='rounded-r-lg p-1 px-4'
				disabled={activeFontSize === fontSizeSettings.max}
				style={{
					backgroundColor:
						activeFontSize === fontSizeSettings.max
							? colorScheme.colorPalette.background.normal
							: colorScheme.colorPalette.background.lighter
				}}
				onPress={() => changeFontSize(activeFontSize + 2)}
			>
				<Plus
					width={30}
					color={colorScheme.colorPalette.text}
					strokeWidth={2}
					height={30}
				/>
			</TouchableOpacity>
		</View>
	</View>
)
