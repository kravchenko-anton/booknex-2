import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { settings } from './settings'
import type { TextAreaProperties } from './types'

const TextArea: FC<TextAreaProperties> = ({
	variant = 'foreground',
	className = '',
	...properties
}) => {
	return (
		<textarea
			value={properties.value}
			className={twMerge(
				'placeholder-gray h-full w-full resize-none rounded-md p-2 text-white focus:outline-0',
				settings.colors[variant],
				className
			)}
			{...properties}
		/>
	)
}

export default TextArea
