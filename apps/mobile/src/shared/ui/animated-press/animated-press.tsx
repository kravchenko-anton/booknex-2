import type { PressableDefaultProperties } from '@/shared/types/component-types'
import { AnimatedPressable } from '@/shared/ui/animated-components'
import { usePressAnimation } from '@/shared/ui/animated-press/press-animation'
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
