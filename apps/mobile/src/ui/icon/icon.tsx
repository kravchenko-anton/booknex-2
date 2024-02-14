import { cn } from '@/utils'
import { InnerColor } from 'global/colors'
import type { FC } from 'react'
import { memo } from 'react'
import { Pressable } from 'react-native'
import { settings } from './settings'
import type { IconProperties } from './types'

const Icon: FC<IconProperties> = ({
	icon: Icon,
	variant = 'foreground',
	size = 'sm',
	fatness = 2,
	className = '',
	fill = false,
	fullRounded = false,
	noPadding = false,
	...properties
}) => (
	<Pressable
		className={cn(
			'items-center justify-center rounded-2xl',
			properties.disabled && 'opacity-50',
			noPadding ? 'p-0' : settings.padding[size],
			settings.colors[variant],
			fullRounded && 'rounded-full',
			className
		)}
		{...properties}
	>
		<Icon
			width={settings.size[size]}
			height={settings.size[size]}
			strokeWidth={fatness}
			fill={fill ? InnerColor[variant] : 'none'}
			stroke={InnerColor[variant]}
		/>
	</Pressable>
)

export default memo(Icon)
