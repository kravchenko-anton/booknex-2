import type { FC, InputHTMLAttributes, PropsWithChildren } from 'react'

export interface TextAreaProperties
	extends InputHTMLAttributes<HTMLTextAreaElement> {
	placeholder?: string
	color?: keyof Pick<
		typeof colorPallete,
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
const TextArea: FC<PropsWithChildren<TextAreaProperties>> = ({
	children = '',
	color = 'foreground',
	className = '',
	style,
	...properties
}) => {
	return (
		<textarea
			className={`placeholder-gray h-full w-full resize-none rounded-lg p-4 text-white focus:outline-0  ${colorPallete[color]} ${className}`}
			{...properties}>
			{children}
		</textarea>
	)
}

export default TextArea
