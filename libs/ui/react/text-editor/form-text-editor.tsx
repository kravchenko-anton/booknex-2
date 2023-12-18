import type { InputHTMLAttributes } from 'react'
import type {
	Control,
	FieldPath,
	FieldValues,
	Path,
	PathValue
} from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { TextAreaProperties } from './text-area'
import TextArea from './text-area'

interface FomrTextEditorProperties<T extends FieldValues>
	extends Omit<
			InputHTMLAttributes<HTMLTextAreaElement>,
			'onChange' | 'onChangeText' | 'value' | 'testID' | 'color'
		>,
		Pick<TextAreaProperties, 'color'> {
	control: Control<T>
	name: FieldPath<T>
	placeholder?: string
}

const FormTextEditor = <T extends Record<string, any>>({
	children = '',
	color = 'foreground',
	className,
	style,
	...properties
}: FomrTextEditorProperties<T>) => {
	return (
		<Controller
			control={properties.control}
			name={properties.name}
			defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => (
				<div className={className} style={style}>
					<TextArea
						onBlur={onBlur}
						onChange={onChange}
						color={color}
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

export default FormTextEditor
