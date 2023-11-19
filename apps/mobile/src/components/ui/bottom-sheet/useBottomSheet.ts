import { BottomSheetListPagesEnum } from '@/components/ui/bottom-sheet/bottom-sheet-list'
import { CalculateSnapPoints } from '@/components/ui/bottom-sheet/calculate-snap-point'
import { useAction } from '@/hooks/useAction'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { shadeBackground } from '@/screens/reading/settings/reading-ui'
import { Color } from '@/utils/color'
import { SCREEN_HEIGHT } from '@/utils/dimensions'
import { shadeRGBColor } from '@/utils/shade-color'
import { useEffect } from 'react'
import type { GestureResponderEvent } from 'react-native'
import { Gesture } from 'react-native-gesture-handler'
import {
	Easing,
	Extrapolation,
	interpolate,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming
} from 'react-native-reanimated'
// TODO: сделать в bottomSheet всё максимально оптимизировано
export const useBottomSheet = () => {
	const { bottomSheet } = useTypedSelector(state => state.bottomSheet)
	const { colorScheme } = useTypedSelector(state => state.readingSettings)
	const translationY = useSharedValue(0)
	const oldTranslationY = useSharedValue(0)
	const { closeBottomSheet } = useAction()
	const CalculatedSnapPoints = CalculateSnapPoints(
		bottomSheet?.snapPoints ?? []
	)
	useEffect(() => {
		if (!CalculatedSnapPoints[0]) return
		if (!bottomSheet) {
			translationY.value = withTiming(0)
			return
		}
		translationY.value = withSpring(-CalculatedSnapPoints[0], { damping: 15 })
	}, [CalculatedSnapPoints])
	const bottomSheetStyle = useAnimatedStyle(() => {
		const borderRaduis = interpolate(
			translationY.value,
			[-SCREEN_HEIGHT + 100, -SCREEN_HEIGHT + 50],
			[23, 0],
			Extrapolation.CLAMP
		)
		// TODO: пофиксить баг с высотой где снизу маленькая хуйня которая закрывает последний елемент и не дает прокрутке
		const inputRange = CalculatedSnapPoints.map((_, index) => {
			return index === 0
				? -SCREEN_HEIGHT
				: -Number(CalculatedSnapPoints[index - 1])
		}) || [SCREEN_HEIGHT, -SCREEN_HEIGHT]

		const outputRange = CalculatedSnapPoints.map((_, index) => {
			return index === 0
				? SCREEN_HEIGHT
				: Number(CalculatedSnapPoints[index - 1])
		}) || [SCREEN_HEIGHT, -SCREEN_HEIGHT]
		return {
			transform: [{ translateY: translationY.value }],
			borderTopLeftRadius: borderRaduis,
			borderTopRightRadius: borderRaduis,
			height:
				CalculatedSnapPoints[0] && CalculatedSnapPoints[1]
					? interpolate(
							translationY.value,
							inputRange,
							outputRange,
							Extrapolation.CLAMP
					  )
					: SCREEN_HEIGHT
		}
	})

	const colorPallet = {
		backgroundColor: bottomSheet?.name.includes(BottomSheetListPagesEnum.reader)
			? shadeRGBColor(colorScheme.colorPalette.background, shadeBackground)
			: Color.dust
	}

	const touch = {
		wrapper: () => {
			translationY.value = withTiming(
				0,
				{ duration: 200, easing: Easing.ease },
				() => runOnJS(closeBottomSheet)()
			)
		},
		content: (event: GestureResponderEvent) => {
			event.stopPropagation()
		}
	}

	const gesture = Gesture.Pan()
		.onStart(() => (oldTranslationY.value = translationY.value))
		.activeOffsetX([-20, 20])
		.onUpdate(event => {
			;`translationY.value = event.translationY + oldTranslationY.value`
			translationY.value = Math.max(
				translationY.value,
				-Number(CalculatedSnapPoints.at(-1))
			)
		})

		.onEnd(() => {
			if (!CalculatedSnapPoints[0]) return
			if (translationY.value > -CalculatedSnapPoints[0]) {
				translationY.value = withSpring(-CalculatedSnapPoints[0], {
					damping: 15
				})
			}
			if (translationY.value > -CalculatedSnapPoints[0] / 1.6) {
				translationY.value = withTiming(
					0,
					{ duration: 200, easing: Easing.ease },
					() => runOnJS(closeBottomSheet)()
				)
			}
			// TODO: сделать чтобы было если близко то привязка
			for (const [index, point] of CalculatedSnapPoints.entries()) {
				if (!point || !Number(CalculatedSnapPoints[index + 1])) return
				if (
					(translationY.value < -point || translationY.value < -point / 1.4) &&
					translationY.value > -Number(CalculatedSnapPoints[index + 1])
				) {
					translationY.value = withSpring(-point, { damping: 15 })
				}
			}
		})
	return {
		bottomSheet,
		colorPallet,
		bottomSheetStyle,
		gesture,
		touch
	}
}
