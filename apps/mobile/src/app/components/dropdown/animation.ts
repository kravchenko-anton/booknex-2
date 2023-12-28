import {
	useAnimatedStyle,
	withSpring,
	withTiming
} from 'react-native-reanimated'

export const useDropDownAnimation = (
	isShow: { value: boolean },
	position: 'left' | 'right'
) => {
	const popupStyle = useAnimatedStyle(() => ({
		pointerEvents: isShow.value ? 'auto' : 'none',
		opacity: withTiming(isShow.value ? 1 : 0),
		transform: [
			{
				translateX: withSpring(
					isShow.value ? 0 : (position === 'left' ? -100 : 100)
				)
			}
		]
	}))

	return {
		popupStyle
	}
}
