import type { FC, InputHTMLAttributes, SVGProps } from 'react'
import type {
	Control,
	FieldPath,
	FieldValues,
	Path,
	PathValue,
	RegisterOptions
} from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { Color } from '../../../../libs/ui/colors'

export interface FieldProperties<T extends FieldValues>
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'onChange' | 'onChangeText' | 'value' | 'testID'
	> {
	control: Control<T>
	name: FieldPath<T>
	placeholder?: string
	icon?: FC<SVGProps<SVGElement>>
	color?: keyof Pick<
		typeof Color,
		'gray' | 'foreground' | 'vibrant' | 'shade' | 'background'
	>
	rules?: Omit<
		RegisterOptions<T, FieldPath<T>>,
		'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
	>
}

const colorPallete = {
	gray: 'bg-gray placeholder-white text-white hover:bg-vibrant focus:bg-vibrant',
	foreground:
		'bg-foreground placeholder-white text-white hover:bg-vibrant focus:bg-vibrant',
	vibrant:
		'bg-vibrant placeholder-white text-white hover:bg-gray focus:bg-gray',
	shade:
		'bg-shade placeholder-white text-white hover:bg-foreground focus:bg-foreground',
	background:
		'bg-background placeholder-white text-white hover:bg-foreground focus:bg-foreground'
}

const Field = <T extends Record<string, any>>({
	color = 'foreground',
	className,
	style,
	icon: Icon,
	...properties
}: FieldProperties<T>): JSX.Element | null => {
	return (
		<Controller
			control={properties.control}
			name={properties.name}
			rules={properties.rules}
			defaultValue={properties.defaultValue as PathValue<T, Path<T>>}
			render={({
				field: { value, onChange, onBlur },
				fieldState: { error }
			}) => (
				<div className={className} style={style}>
					<div className='relative flex items-center justify-center'>
						<input
							onBlur={onBlur}
							onChange={onChange}
							defaultValue={properties.defaultValue}
							value={(value ?? '').toString()}
							className={`text-gray focus:shadow-outline w-full rounded-md border-0 px-4 py-3 text-sm duration-200 ease-linear focus:outline-0 ${
								colorPallete[color]
							} ${error ? 'border-danger border-2' : ''} ${className || ''} ${
								properties.disabled ? 'cursor-not-allowed opacity-50' : ''
							} ${Icon ? 'pl-9' : ''}`}
							{...properties}
						/>
						{Icon && (
							<Icon
								width={20}
								height={20}
								className='text-gray absolute left-2'
							/>
						)}
					</div>
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

export default Field
