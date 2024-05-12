import { useTypedNavigation } from '@/hooks';
import { AnimatedView } from '@/ui/animated-components';
import ProgressBar from '@/ui/progress-bar/progress-bar';
import { ArrowLeft, CaseSensitive, ListOrdered } from 'icons';
import { View } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const ReaderHeader = ({ visible = false, onChapterIconPress, colorScheme, readingProgress, onSelectThemeIconPress }) => {
    const { navigate } = useTypedNavigation();
    const { top } = useSafeAreaInsets();
    const fadeAnimation = useAnimatedStyle(() => ({
        opacity: withTiming(Boolean(visible) ? 1 : 0, { duration: 200 })
    }));
    return (<View className='absolute h-screen w-full'>
			<AnimatedView className=' absolute z-50 mb-0 mt-0 w-full flex-1 justify-center border-b-2' style={[
            fadeAnimation,
            {
                top,
                backgroundColor: colorScheme.colorPalette.background.darker,
                borderBottomColor: colorScheme.colorPalette.background.lighter
            }
        ]}>
				<View className='mt-0 w-full flex-row items-center justify-between px-4 pb-2.5 pt-2.5'>
					<View className='w-2/3 flex-row items-center'>
						<ArrowLeft width={28} height={28} color={colorScheme.colorPalette.text} onPress={() => navigate('Library')}/>
						<View className='ml-auto w-1/2'>
							<ProgressBar className='mb-1.5' tintColor={colorScheme.colorPalette.secondary} trackTintColor={colorScheme.colorPalette.background.lighter} progress={(readingProgress.chapter.progress || 0) / 100}/>
							<ProgressBar tintColor={colorScheme.colorPalette.primary} trackTintColor={colorScheme.colorPalette.background.lighter} progress={readingProgress.progress / 100}/>
						</View>
					</View>
					<View className='flex-row items-center gap-6'>
						<ListOrdered width={28} height={28} color={colorScheme.colorPalette.text} onPress={onChapterIconPress}/>
						<CaseSensitive width={28} height={28} color={colorScheme.colorPalette.text} onPress={onSelectThemeIconPress}/>
					</View>
				</View>
			</AnimatedView>
		</View>);
};
export default ReaderHeader;
//# sourceMappingURL=reader-header.js.map