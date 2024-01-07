import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { Color } from '../../colors'
import { settings } from './settings'
import type { InputProperties } from './types'

const Input: FC<InputProperties> = ({
	icon: Icon,
	isError = false,
	className = '',
	variant = 'foreground',
	value = '',
	...properties
}) => {
	return (
		<div className='relative flex items-center justify-center'>
			<input
				value={value}
				className={twMerge(
					'placeholder-gray focus:shadow-outline w-full rounded-xl border-0 px-4 py-3 text-sm text-white duration-200 ease-linear focus:outline-0',
					Icon && 'pl-9',
					isError && 'border-danger border-2',
					settings.colors[variant],
					properties.disabled && 'cursor-not-allowed opacity-50',
					className
				)}
				{...properties}
			/>
			{Icon && (
				<Icon
					width={20}
					height={20}
					color={Color.gray}
					className='absolute left-2.5'
				/>
			)}
		</div>
	)
}

export default Input
