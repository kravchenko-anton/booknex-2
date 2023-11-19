import { useMemo } from 'react'
import { useAnimatedStyle, withSpring } from 'react-native-reanimated'

export const useHeaderAnimation = (
	scrollPosition: { value: number },
	transientValue: number
) => {
	const headerStyle = useAnimatedStyle(() => ({
			opacity: withSpring(scrollPosition.value >= transientValue ? 1 : 0),
			pointerEvents: scrollPosition.value >= transientValue ? 'auto' : 'none',
			transform: [
				{
					translateY: withSpring(
						scrollPosition.value >= transientValue ? 0 : -100,
						{
							damping: 20,
							stiffness: 90
						}
					)
				}
			]
		}))

	return useMemo(() => ({ headerStyle }), [headerStyle])
}
