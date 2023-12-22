'use client'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
import { ChevronDown } from '../../../global/icons/react'

// create reuse select component with search and async load when user type (no using libs)

interface SelectProperties {
	className?: string
	placeholder?: string
	options?: { label: string; value: string }[]
	value?: string
	onChange?: (event: any) => void
	onBlur?: (event: any) => void
}

const Select: FC<SelectProperties> = ({
	className = '',
	placeholder = '',
	options = [],
	value = '',
	onChange,
	onBlur
}) => {
	return (
		<div className='relative'>
			<input
				type='text'
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				className={twMerge(
					'w-full rounded-md border-0 px-4 py-3 text-sm text-white duration-200 ease-linear focus:outline-0',
					className
				)}
			/>
			<div className='absolute right-0 top-0 flex h-full items-center pr-2'>
				<ChevronDown width={20} height={20} className='text-gray' />
			</div>
			{options.length > 0 && (
				<div className='bg-shade absolute left-0 top-full mt-1.5 w-full rounded-md shadow-lg'>
					{options.map((option, index) => (
						<div
							key={index}
							className='cursor-pointer px-4 py-3 text-sm text-white duration-200 ease-linear hover:bg-gray-700'
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Select
