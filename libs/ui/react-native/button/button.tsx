import { memo } from 'react'
import { twMerge } from 'tailwind-merge'
import { PressableContainer } from '../../../../apps/mobile/src/app/components'
import { InnerColor } from '../../colors'
import Title from '../title/title'
import { settings } from './settings'
import type { ButtonProperties } from './types'

const Button = ({
	size = 'lg',
	variant = 'vibrant',
	className = '',
	...properties
}: ButtonProperties) => {
	return (
		<PressableContainer
			className={twMerge(
				'items-center justify-center rounded-md',
				settings.colors[variant],
				properties.disabled && 'opacity-70',
				settings.padding[size],
				className
			)}
			{...properties}
		>
			<Title
				weight='bold'
				color={InnerColor[variant]}
				size={settings.titleSize[size]}
			>
				{properties.text}
			</Title>
		</PressableContainer>
	)
}

export default memo(Button)
