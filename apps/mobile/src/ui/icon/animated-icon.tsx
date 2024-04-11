import { AnimatedPress } from '@/ui'
import { cn } from '@/utils'
import { InnerColor } from 'global/colors'
import type { FC } from 'react'
import { settings } from './settings'

import type { IconProperties } from './types'

const AnimatedIcon: FC<IconProperties> = ({
	icon: Icon,
	variant = 'foreground',
	size = 'sm',
	fatness = 2,
	className = '',
	fill = false,
	noPadding = false,
	...properties
}) => (
	<AnimatedPress
		className={cn(
			'items-center justify-center rounded-lg',
			properties.disabled && 'opacity-50',
			noPadding ? 'p-0' : settings.padding[size],
			settings.colors[variant],
			className
		)}
		{...properties}>
		<Icon
			width={settings.size[size]}
			height={settings.size[size]}
			strokeWidth={fatness}
			fill={fill ? InnerColor[variant] : 'none'}
			stroke={InnerColor[variant]}
		/>
	</AnimatedPress>
)

export default AnimatedIcon
