import type { InputHTMLAttributes } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'
import { Controller, type Path, type PathValue } from 'react-hook-form'
import type { DropzoneProperties } from './dropzone'
import Dropzone from './dropzone'

export interface FormDropZoneProperties<T extends FieldValues>
	extends Omit<
			InputHTMLAttributes<HTMLInputElement>,
			'onChange' | 'onChangeText' | 'value' | 'size' | 'testID' | 'color'
		>,
		Pick<
			DropzoneProperties,
			| 'size'
			| 'options'
			| 'color'
			| 'onFileDelete'
			| 'onDropFile'
			| 'defaultFiles'
		> {
	control: Control<T>
	name: FieldPath<T>
}

const FormDropzone = <T extends Record<string, any>>({
	className,
	color = 'foreground',
	style,
	size = 'sm',
	...properties
}: FormDropZoneProperties<T>) => {
	return (
		<Controller
			control={properties.control}
			name={properties.name}
			defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
			render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
				<div className={className} style={style}>
					<Dropzone
						size={size}
						onBlur={onBlur}
						onChange={onChange}
						color={color}
						{...properties}
					/>
					{!!error && (
						<p className={`text-danger text-md mt-2 italic`}>{error.message}</p>
					)}
				</div>
			)}
		/>
	)
}

export default FormDropzone
