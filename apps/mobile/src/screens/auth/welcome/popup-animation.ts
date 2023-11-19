import { useMemo } from 'react'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'

export const popupAnimation = (isCheckEmailModal: boolean) => {
	const showAnimation = useAnimatedStyle(() => ({
		opacity: withTiming(isCheckEmailModal ? 1 : 0, {
			duration: 1000
		}),
		display: isCheckEmailModal ? 'flex' : 'none'
	}))
	return useMemo(() => ({ showAnimation }), [showAnimation])
}
