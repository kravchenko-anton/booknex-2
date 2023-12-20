import { Controller, type Path, type PathValue } from 'react-hook-form'
import { ErrorText } from '../common-styled-component'
import Dropzone from './dropzone'
import type { FormDropZoneProperties } from './types'


const FormDropzone =
	<T extends Record<string, any>>
	({
		 color = 'foreground',
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
							color={color}
							{...properties}
						/>
						{!!error && (
							<ErrorText>{error.message}</ErrorText>
						)}
					</div>
				)}
			/>
		)
	}

export default FormDropzone
