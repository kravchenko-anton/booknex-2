'use client'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { Props } from 'react-select'
import Select from './select'

export interface FormSelectProperties<T extends FieldValues>
	extends Omit<Props, 'styles'> {
	control: Control<T>
	name: FieldPath<T>
}
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
						<p className={`text-danger mt-0.5 text-xs italic`}>
							{error.message}
						</p>
					)}
				</div>
			)}
		/>
	)
}

export default FormSelect