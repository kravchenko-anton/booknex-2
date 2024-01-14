'use client'
import { Controller } from 'react-hook-form'
import type { FormSelectProperties } from '../types'
import AsyncSelect from './select'

const FormAsyncSelect = <T extends Record<string, any>>({
	className,
	...properties
}: FormSelectProperties<T>) => {
	return (
		<Controller
			control={properties.control}
			name={properties.name}
			render={({
				field: { onChange, onBlur, value },
				fieldState: { error }
			}) => (
				<div className={className}>
					<AsyncSelect
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						{...properties}
					/>
					{!!error && (
						<p className='text-danger mt-0.5 text-xs italic'>{error.message}</p>
					)}
				</div>
			)}
		/>
	)
}

export default FormAsyncSelect
