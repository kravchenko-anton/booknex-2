import PressableContainer from '@/components/animated-press/animated-press'
import type { FC } from 'react'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { InnerColor } from '../../colors'
import { settings } from './settings'

import type { IconProperties } from './types'

const AnimatedIcon: FC<IconProperties> = ({
	icon: Icon,
	variant = 'vibrant',
	size = 'sm',
	fatness = 2,
	className = '',
	noPadding = false,
	...properties
}) => (
	<PressableContainer
		className={twMerge(
			'items-center justify-center rounded-xl',
			properties.disabled && 'opacity-50',
			noPadding ? 'p-0' : settings.padding[size],
			settings.colors[variant],
			className
		)}
		{...properties}
	>
		<Icon
			width={settings.size[size]}
			height={settings.size[size]}
			strokeWidth={fatness}
			stroke={InnerColor[variant]}
		/>
	</PressableContainer>
)

export default memo(AnimatedIcon)
