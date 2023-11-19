import { usePressAnimation } from '@/animations/press-animation'
import type {
	PressableDefaultProperties
} from '@/types/component-types';
import {
	AnimatedPressable
} from '@/types/component-types'
import type { FC, PropsWithChildren } from 'react';
import { memo } from 'react'

const PressableContainer: FC<PropsWithChildren<PressableDefaultProperties>> = ({
	children,
	style,
	...properties
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			{...pressFunctions}
			style={[style, animatedStyle]}
			{...properties}>
			{children}
		</AnimatedPressable>
	)
}

export default memo(PressableContainer)
