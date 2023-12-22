import type { Path, PathValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import Input from './input'
import type { FieldProperties } from './types'

const Field = <T extends Record<string, any>>({
	variant = 'foreground',
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
						variant={variant}
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
