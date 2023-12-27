import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { InnerColor } from '../../colors'
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
}) => {
	return (
		<button
			disabled={disabled || isLoading}
			className={twMerge(
				'flex cursor-pointer items-center justify-center gap-2 rounded-md p-2 px-3 font-bold duration-200 ease-linear',
				settings.size[size],
				settings.colors[variant],
				(disabled || isLoading) && 'cursor-not-allowed opacity-50',
				fullWidth ? 'w-full' : '',
				className
			)}
			{...properties}
		>
			{children}

			{isLoading && (
				<Loader
					width={settings.iconSize[size]}
					height={settings.iconSize[size]}
					color={InnerColor[variant]}
				/>
			)}
			{!!Icon && !isLoading && (
				<Icon
					color={InnerColor[variant]}
					width={settings.iconSize[size]}
					height={settings.iconSize[size]}
				/>
			)}
		</button>
	)
}

export default Button
