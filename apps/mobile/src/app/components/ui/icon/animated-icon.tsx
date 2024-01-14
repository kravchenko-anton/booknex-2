import AnimatedPress from '@/components/animated-press/animated-press'
import { InnerColor } from 'global/colors'
import type { FC } from 'react'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { settings } from './settings'

import type { IconProperties } from './types'

const AnimatedIcon: FC<IconProperties> = ({
	icon: Icon,
	variant = 'foreground',
	size = 'sm',
	fatness = 2,
	className = '',
	noPadding = false,
	...properties
}) => (
	<AnimatedPress
		className={twMerge(
			'items-center justify-center rounded-2xl',
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
	</AnimatedPress>
)

export default memo(AnimatedIcon)
