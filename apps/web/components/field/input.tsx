import type { FC, InputHTMLAttributes, SVGProps } from 'react'
import type { Color } from '../../../../libs/ui/colors'

export interface InputProperties extends InputHTMLAttributes<HTMLInputElement> {
	placeholder?: string
	isError?: boolean
	icon?: FC<SVGProps<SVGElement>>
	color?: keyof Pick<
		typeof Color,
		'gray' | 'foreground' | 'vibrant' | 'shade' | 'background'
	>
}

const colorPallete = {
	gray: 'bg-gray placeholder-white text-white border-2 border-transparent hover:border-foreground focus:border-vibrant',
	foreground:
		'bg-foreground placeholder-white text-white border-2 border-transparent hover:border-foreground focus:border-vibrant',
	vibrant:
		'bg-vibrant placeholder-white text-white border-2 border-transparent hover:border-gray focus:border-gray',
	shade:
		'bg-shade placeholder-white text-white border-2 border-transparent hover:border-foreground focus:border-foreground',
	background:
		'bg-background border-2 border-transparent placeholder-white text-white hover:border-foreground focus:border-foreground'
}
const Input: FC<InputProperties> =
	({
		 icon: Icon,
		 isError = false,
		 className = '',
		 color = 'foreground',
		 value = '',
		 ...properties
	 }) => {
		return (
			<div className="relative flex items-center justify-center">
				<input
					value={(value ?? '').toString()}
					className={`placeholder-gray focus:shadow-outline w-full rounded-md border-0 px-4 py-3 text-sm text-white duration-200 ease-linear focus:outline-0 ${
						colorPallete[color]
					} ${isError ? 'border-danger border-2' : ''} ${className} ${
						properties.disabled ? 'cursor-not-allowed opacity-50' : ''
					} ${Icon ? 'pl-9' : ''}`}
					{...properties}
				/>
				{Icon && (
					<Icon width={20} height={20} className="text-gray absolute left-2" />
				)}
			</div>
		)
	}

export default Input
