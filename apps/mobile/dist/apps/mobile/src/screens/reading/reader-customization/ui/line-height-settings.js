import LineHeightIcon from '@/screens/reading/reader-customization/ui/icons/line-height';
import { View } from 'react-native';
export const LineHeightSettings = ({ changeLineHeight, colorScheme, lineHeight }) => (<View className='mr-4 flex-row items-center'>
		<LineHeightIcon lineCount={3} backgroundColor={lineHeight === 1.8
        ? colorScheme.colorPalette.primary
        : colorScheme.colorPalette.text} onPress={() => changeLineHeight(1.8)}/>
		<LineHeightIcon lineCount={4} className='mx-3' backgroundColor={lineHeight === 1.5
        ? colorScheme.colorPalette.primary
        : colorScheme.colorPalette.text} onPress={() => changeLineHeight(1.5)}/>
		<LineHeightIcon lineCount={5} backgroundColor={lineHeight === 1.3
        ? colorScheme.colorPalette.primary
        : colorScheme.colorPalette.text} onPress={() => changeLineHeight(1.3)}/>
	</View>);
//# sourceMappingURL=line-height-settings.js.map