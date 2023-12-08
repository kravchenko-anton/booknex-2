import type { FC, HTMLAttributes, PropsWithChildren } from 'react'

type TextEditorProperties = {
	value?: string
	color?: keyof Pick<
		typeof colorPallete,
		'gray' | 'foreground' | 'vibrant' | 'shade' | 'background'
	>
} & HTMLAttributes<HTMLTextAreaElement>
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
const TextEditor: FC<PropsWithChildren<TextEditorProperties>> = ({
	children,
	color = 'foreground',
	className,
	value,
	...rest
}) => {
	return (
		<textarea
			value={value}
			className={`h-full w-full resize-none rounded-lg p-4 focus:outline-0  ${
				colorPallete[color]
			} ${className || ''}`}
			{...rest}>
			{children}
		</textarea>
	)
}

export default TextEditor
