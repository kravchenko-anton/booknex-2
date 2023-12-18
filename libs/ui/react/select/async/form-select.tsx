'use client'
import type { ComponentProps } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type ReactAsyncSelect from 'react-select/async'
import AsyncSelect from './select'

export interface FormSelectProperties<T extends FieldValues>
	extends Omit<ComponentProps<typeof ReactAsyncSelect>, 'styles'> {
	control: Control<T>
	name: FieldPath<T>
}
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
						<p className={`text-danger mt-0.5 text-xs italic`}>
							{error.message}
						</p>
					)}
				</div>
			)}
		/>
	)
}

export default FormAsyncSelect
