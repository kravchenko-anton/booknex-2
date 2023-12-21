import type {
	Control,
	FieldPath,
	FieldValues,
	Path,
	PathValue
} from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { DefaultInputProperties } from '../components-props-types'
import type { InputProperties } from './input'
import Input from './input'

export interface FieldProperties<T extends FieldValues>
	extends DefaultInputProperties,
		Pick<InputProperties, 'color' | 'icon'> {
	control: Control<T>
	name: FieldPath<T>
}

const Field = <T extends Record<string, any>>({
	color = 'foreground',
	className,
	style,
	icon: Icon,
	...properties
}: FieldProperties<T>): JSX.Element | null => {
	console.log(properties)
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
					<Input
						onBlur={onBlur}
						onChange={onChange}
						color={color}
						isError={!!error}
						value={value}
						icon={Icon}
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

export default Field
