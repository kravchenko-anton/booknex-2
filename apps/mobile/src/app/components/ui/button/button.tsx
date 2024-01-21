import { AnimatedPress } from '@/components'
import { InnerColor } from 'global/colors'
import { memo } from 'react'
import { ActivityIndicator } from 'react-native'
import { twMerge } from 'tailwind-merge'
import Title from '../title/title'
import { settings } from './settings'
import type { ButtonProperties } from './types'

const Button = ({
	size = 'lg',
	variant = 'foreground',
	disabled = false,
	isLoading = false,
	icon: Icon,
	className = '',
	pulse = false,
	children = '',
	...properties
}: ButtonProperties) => {
	return (
		<AnimatedPress
			disabled={disabled || isLoading}
			className={twMerge(
				'flex-row items-center justify-center rounded-xl',
				settings.padding[size],
				settings.colors[variant],
				(disabled || isLoading) && 'opacity-70',
				className
			)}
			{...properties}
		>
			{isLoading && (
				<ActivityIndicator
					className='mr-2 mt-0.5'
					color={InnerColor[variant]}
					style={{
						width: settings.iconSize[size],
						height: settings.iconSize[size]
					}}
				/>
			)}
			{!!Icon && !isLoading && (
				<Icon
					className='mr-2 mt-0.5'
					color={InnerColor[variant]}
					width={settings.iconSize[size]}
					height={settings.iconSize[size]}
				/>
			)}
			<Title
				weight='bold'
				color={InnerColor[variant]}
				size={settings.titleSize[size]}
			>
				{children}
			</Title>
		</AnimatedPress>
	)
}

export default memo(Button)
