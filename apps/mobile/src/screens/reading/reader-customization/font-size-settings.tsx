import { fontSizeSettings } from '@/redux/reader/reading-settings-slice'
import { useReaderCustomization } from '@/screens/reading/reader-customization/reader-customization-context'
import { Title } from '@/ui'
import { Minus, Plus } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler'

export const FontSizeSettings: FC = () => {
	const { colorScheme, fontSize } = useReaderCustomization()
	return (
		<View className='my-1.5 flex-row items-center justify-between px-3'>
			<Title
				weight='semiBold'
				size={'xxl'}
				color={colorScheme.colorPalette.text}
			>
				Font size
			</Title>
			<View className='flex-row items-center'>
				<TouchableOpacity
					className='rounded-l-lg p-1 px-4'
					disabled={fontSize.value === fontSizeSettings.min}
					style={{
						backgroundColor:
							fontSize.value === fontSizeSettings.min
								? colorScheme.colorPalette.background.normal
								: colorScheme.colorPalette.background.lighter
					}}
					onPress={() => fontSize.changeFontSize(fontSize.value - 2)}
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
					disabled={fontSize.value === fontSizeSettings.max}
					style={{
						backgroundColor:
							fontSize.value === fontSizeSettings.max
								? colorScheme.colorPalette.background.normal
								: colorScheme.colorPalette.background.lighter
					}}
					onPress={() => fontSize.changeFontSize(fontSize.value + 2)}
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
}
