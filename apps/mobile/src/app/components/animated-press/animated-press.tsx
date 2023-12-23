import { usePressAnimation } from '@/animations/press-animation'
import { AnimatedPressable } from '@/components/animated'
import type { PressableDefaultProperties } from '@/components/component-types'
import type { FC, PropsWithChildren } from 'react'
import { memo } from 'react'

const AnimatedPress: FC<PropsWithChildren<PressableDefaultProperties>> = ({
	children,
	style,
	className = '',
	...properties
}) => {
	const { pressFunctions, animatedStyle } = usePressAnimation()
	return (
		<AnimatedPressable
			{...pressFunctions}
			className={className}
			style={[style, animatedStyle]}
			{...properties}
		>
			{children}
		</AnimatedPressable>
	)
}

export default memo(AnimatedPress)
