'use client'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { ErrorText } from '../common-styled-component'
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
					{!!error && <ErrorText>{error.message}</ErrorText>}
				</div>
			)}
		/>
	)
}

export default FormSelect
