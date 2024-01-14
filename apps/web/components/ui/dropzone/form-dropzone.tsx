'use client'
import { Controller, type Path, type PathValue } from 'react-hook-form'
import Dropzone from './dropzone'
import type { FormDropZoneProperties } from './types'

const FormDropzone = <T extends Record<string, any>>({
	variant = 'foreground',
	size = 'sm',
	...properties
}: FormDropZoneProperties<T>) => {
	return (
		<Controller
			control={properties.control}
			name={properties.name}
			defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
			render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
				<div>
					<Dropzone
						size={size}
						onBlur={onBlur}
						onChange={onChange}
						variant={variant}
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

export default FormDropzone
