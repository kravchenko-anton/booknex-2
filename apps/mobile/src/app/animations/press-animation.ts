import type { AnimationConfigType } from '@/types/global'
import { useMemo } from 'react'
import {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from 'react-native-reanimated'

export const usePressAnimation = ({
	userConfig = { duration: 100 }
}: AnimationConfigType = {}) => {
	const translateY = useSharedValue(0)
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }]
	}))

	const onPressIn = () => {
		translateY.value = withTiming(5, userConfig)
	}
	const onPressOut = () => {
		translateY.value = withTiming(0, userConfig)
	}
	const pressFunctions = useMemo(
		() => ({ onPressIn, onPressOut }),
		[onPressIn, onPressOut]
	)
	return useMemo(
		() => ({ animatedStyle, pressFunctions }),
		[animatedStyle, pressFunctions]
	)
}
