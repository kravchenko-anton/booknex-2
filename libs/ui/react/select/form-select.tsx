'use client'
import { Controller } from 'react-hook-form'
import Select from './select'
import type { FormSelectProperties } from './types'

const FormSelect = <T extends Record<string, any>>({
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
					<Select
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						{...properties}
					/>
					{!!error && (
						<p className='text-danger text-md mt-2 italic'>{error.message}</p>
					)}
				</div>
			)}
		/>
	)
}

export default FormSelect
