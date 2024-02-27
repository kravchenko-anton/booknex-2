import { cn } from '@/utils'
import { InnerColor } from 'global/colors'
import type { FC } from 'react'
import Loader from '../loader/loader'
import { settings } from './settings'
import type { ButtonProperties } from './types'

const Button: FC<ButtonProperties> = ({
	children,
	icon: Icon,
	fullWidth,
	size = 'md',
	variant = 'primary',
	disabled = false,
	isLoading = false,
	className,
	...properties
}) => (
	<button
		disabled={disabled || isLoading}
		className={cn(
			'flex cursor-pointer items-center justify-center gap-2 rounded-lg p-2 px-3 font-bold duration-200 ease-linear',
			settings.size[size],
			settings.colors[variant],
			(disabled || isLoading) && 'cursor-not-allowed opacity-50',
			fullWidth ? 'w-full' : '',
			className
		)}
		{...properties}
	>
		{children}

		{isLoading ? (
			<Loader
				width={settings.iconSize[size]}
				height={settings.iconSize[size]}
				color={InnerColor[variant]}
			/>
		) : null}
		{!!Icon && !isLoading && (
			<Icon
				color={InnerColor[variant]}
				width={settings.iconSize[size]}
				height={settings.iconSize[size]}
			/>
		)}
	</button>
)

export default Button
