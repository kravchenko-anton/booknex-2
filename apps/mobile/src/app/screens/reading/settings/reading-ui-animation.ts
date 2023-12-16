import { useMemo } from 'react'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

export const useReadingAnimation = (visible: boolean) => {
	const headerAnimation = useAnimatedStyle(() => ({
		opacity: withTiming(visible ? 1 : 0)
	}))

	const footerAnimation = useAnimatedStyle(() => ({
		opacity: withTiming(visible ? 1 : 0)
	}))

	return useMemo(() => ({ headerAnimation, footerAnimation }), [visible])
}
