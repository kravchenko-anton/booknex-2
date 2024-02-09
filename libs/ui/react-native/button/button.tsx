import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { PressableContainer } from '../../../../apps/mobile/src/app/components'
import { InnerColor } from '../../colors'
import Loader from '../../react/loader/loader'
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
	children = '',
	...properties
}: ButtonProperties) => {
	return (
		<PressableContainer
			disabled={disabled || isLoading}
			className={twMerge(
				'flex-row items-center justify-center rounded-xl',
				settings.colors[variant],
				(disabled || isLoading) && 'opacity-70',
				settings.padding[size],
				className
			)}
			{...properties}
		>
			{isLoading && (
				<Loader
					width={settings.iconSize[size]}
					height={settings.iconSize[size]}
					color={InnerColor[variant]}
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
		</PressableContainer>
	)
}

export default memo(Button)
