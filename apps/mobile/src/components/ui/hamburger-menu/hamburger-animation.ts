import {
	useAnimatedStyle,
	useDerivedValue,
	withSpring,
	withTiming
} from 'react-native-reanimated'

export const useHamburgerAnimation = (
	isShow: { value: boolean },
	position: 'left' | 'right'
) => {
	const popupStyle = useAnimatedStyle(() => ({
		pointerEvents: isShow.value ? 'auto' : 'none',
		opacity: withTiming(isShow.value ? 1 : 0),
		transform: [
			{
				translateX: withSpring(
					isShow.value ? 0 : position === 'left' ? -100 : 100
				)
			}
		]
	}))
	const backdropStyle = useAnimatedStyle(() => ({
		pointerEvents: isShow.value ? 'auto' : 'none',
		display: isShow.value ? 'flex' : 'none'
	}))
	const widthSecondLineAnimation = useAnimatedStyle(
		() => ({
			width: withTiming(isShow.value ? 0 : 24),
			marginVertical: 6.5
		}),
		[isShow.value]
	)

	const rotate = useDerivedValue(
		() => withTiming(isShow.value ? 45 : 0),
		[isShow.value]
	)

	const transformFirstLineAnimation = useAnimatedStyle(
		() => ({
			transform: [
				{
					rotate: `${rotate.value}deg`
				},
				{
					translateY: withTiming(isShow.value ? 12 : 0)
				}
			]
		}),
		[isShow.value]
	)

	const transformThirdLineAnimation = useAnimatedStyle(
		() => ({
			transform: [
				{
					rotate: `-${rotate.value}deg`
				},
				{
					translateY: withTiming(isShow.value ? -12 : 0)
				}
			]
		}),
		[isShow.value]
	)

	const styleAnimation = useAnimatedStyle(
		() => ({
			transform: [
				{
					translateX: withTiming(isShow.value ? 8 : 0)
				}
			]
		}),
		[isShow.value]
	)

	return {
		popupStyle,
		backdropStyle,
		styleAnimation,
		transformFirstLineAnimation,
		transformThirdLineAnimation,
		widthSecondLineAnimation
	}
}
