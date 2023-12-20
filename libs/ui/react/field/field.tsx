import type { Path, PathValue } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { ErrorText } from '../common-styled-component'
import Input from './input'
import type { FieldProperties } from './types'

const Field = <T extends Record<string, any>>({
	color = 'foreground',
	icon: Icon,
	...properties
}: FieldProperties<T>): JSX.Element | null => {
	return (
		<Controller
			control={properties.control}
			name={properties.name}
			defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => (
				<div>
					<Input
						onBlur={onBlur}
						onChange={onChange}
						color={color}
						isError={!!error}
						value={value}
						icon={Icon}
						{...properties}
					/>
					{!!error && <ErrorText>{error.message}</ErrorText>}
				</div>
			)}
		/>
	)
}

export default Field
