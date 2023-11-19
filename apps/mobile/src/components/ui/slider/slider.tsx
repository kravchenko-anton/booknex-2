import type { ViewDefaultProperties } from '@/types/component-types'
import { Color } from '@/utils/color'
import { WINDOW_WIDTH } from '@/utils/dimensions'
import type { ComponentType } from 'react'
import React from 'react'
import type { ViewProps } from 'react-native'
import { Pressable, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import type { WithSpringConfig } from 'react-native-reanimated'
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue
} from 'react-native-reanimated'

const DEFAULT_THUMB_SIZE = 16
const DEFAULT_MAX_TRACK_HEIGHT = 5
const DEFAULT_MIN_TRACK_HEIGHT = 5

const DEFAULT_SLIDER_HORIZONTAL_MARGIN = 20
const DEFAULT_SLIDER_WIDTH = WINDOW_WIDTH - DEFAULT_SLIDER_HORIZONTAL_MARGIN * 2

function clamp(value: number, min: number, max: number) {
	'worklet'
	return Math.min(Math.max(value, min), max)
}

type SliderStyleProperties = {
	maxTrackColor?: string
	minTrackColor?: string
	thumbSize?: number
	borderRadius?: number
	thumbColor?: string
	width?: number
}
export type SliderProperties = SliderStyleProperties &
	ViewDefaultProperties & {
		initialValue?: number
		maxValue?: number
		minValue?: number
		onIndexChange?: (value: number) => void
		springConfig?: WithSpringConfig
		step?: number
		ThumbComponent?: ComponentType<Pick<ViewProps, 'style'>>
		touchSlop?: number
		trumbInside?: boolean
		activeOffsetX?: number | number[]
	}
export function Slider({
	initialValue,
	minValue = 0,
	maxValue = 10,
	step,
	borderRadius,
	trumbInside,
	onIndexChange,
	ThumbComponent = View,
	maxTrackColor = Color.primary,
	minTrackColor = Color.gray,
	thumbSize = DEFAULT_THUMB_SIZE,
	thumbColor = Color.white,
	touchSlop = 10,
	width = DEFAULT_SLIDER_WIDTH,
	springConfig,
	activeOffsetX = [-10, 10],
	...properties
}: SliderProperties) {
	const radius = thumbSize / 2
	console.log(width)
	const CalcWidth = trumbInside ? width - DEFAULT_THUMB_SIZE / 2 : width
	const CalcMin = trumbInside ? DEFAULT_THUMB_SIZE / 2 : 0
	const isPressed = useSharedValue(false)
	const translateX = useSharedValue(
		initialValue === undefined
			? 0
			: ((initialValue - minValue) / (maxValue - minValue)) * width
	)
	const thumbAnimStyle = useAnimatedStyle(
		() => ({
			transform: [{ translateX: translateX.value }],
			...(touchSlop && { margin: -touchSlop, padding: touchSlop }),
			borderRadius: radius,
			left: -radius
		}),
		[radius]
	)
	const maxTrackAnimStyle = useAnimatedStyle(
		() => ({
			width: translateX.value
		}),
		[]
	)

	const start = useSharedValue(translateX.value)

	const gesture = Gesture.Pan()
		.hitSlop(touchSlop)
		.maxPointers(1)
		.minPointers(1)
		.activeOffsetX(activeOffsetX)
		.onStart(e => {
			start.value = translateX.value
		})
		.onUpdate(e => {
			const UpdateTranslateX = e.translationX + start.value
			translateX.value = clamp(UpdateTranslateX, CalcMin, CalcWidth)
		})
		.onEnd(e => {
			if (step === undefined) {
				console.log('no step')
				const estimate = translateX.value + e.velocityX * 0.03
				const EndValue = clamp(estimate, CalcMin, CalcWidth)
				if (onIndexChange) {
					runOnJS(onIndexChange)(
						(EndValue / CalcWidth) * (maxValue - minValue) + minValue
					)
				}
			} else {
				const numberSteps = (maxValue - minValue) / step
				const interval = CalcWidth / numberSteps
				const estimate = translateX.value + e.velocityX * 0.03
				const toIndex = clamp(Math.round(estimate / interval), 0, numberSteps)
				const EndValue = minValue + toIndex * step

				if (onIndexChange) {
					runOnJS(onIndexChange)(EndValue)
				}
			}
		})

	return (
		<Pressable
			// onPress={e => {
			// 	isPressed.value = true
			// 	const estimate = e.nativeEvent.locationX
			// 	console.log(estimate, 'estimate')
			// 	const EndValue = clamp(estimate, CalcMin, CalcWidth)
			// 	if (onIndexChange) {
			// 		runOnJS(onIndexChange)(
			// 			(EndValue / CalcWidth) * (maxValue - minValue) + minValue
			// 		)
			// 	}
			// 	isPressed.value = false
			// }}
			className='justify-center'
			style={{
				height: thumbSize,
				width: width
			}}
			{...properties}>
			<View
				style={{ ...StyleSheet.absoluteFillObject }}
				className='justify-center'>
				<View
					style={{
						backgroundColor: minTrackColor,
						borderRadius: borderRadius ?? DEFAULT_MIN_TRACK_HEIGHT / 2,
						height: DEFAULT_MIN_TRACK_HEIGHT
					}}
				/>
			</View>
			<View
				style={{ ...StyleSheet.absoluteFillObject }}
				className='items-start justify-center'>
				<Animated.View
					style={[
						{
							backgroundColor: maxTrackColor,
							borderRadius: DEFAULT_MAX_TRACK_HEIGHT / 2,
							height: DEFAULT_MAX_TRACK_HEIGHT
						},
						maxTrackAnimStyle
					]}
				/>
			</View>
			<View
				style={{ ...StyleSheet.absoluteFillObject }}
				className='items-start justify-center'>
				<GestureDetector gesture={gesture}>
					<Animated.View style={thumbAnimStyle}>
						<ThumbComponent
							style={{
								backgroundColor: thumbColor,
								borderColor: Color.white,
								borderRadius: DEFAULT_THUMB_SIZE / 2,
								height: DEFAULT_THUMB_SIZE,
								width: DEFAULT_THUMB_SIZE
							}}
						/>
					</Animated.View>
				</GestureDetector>
			</View>
		</Pressable>
	)
}
