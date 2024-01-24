import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

export const useReadingUIAnimation = (visible: boolean) => {
	const opacityAnimation = useAnimatedStyle(() => {
		return {
			opacity: withTiming(visible ? 1 : 0)
		}
	})

	return {
		opacityAnimation
	}
}
