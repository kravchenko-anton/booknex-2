import type {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	InputHTMLAttributes
} from 'react'

export type DefaultButtonProperties = Pick<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	'onClick' | 'type' | 'disabled' | 'children'
>

export type DefaultInputProperties = Pick<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	| 'onClick'
	| 'onBlur'
	| 'disabled'
	| 'value'
	| 'onChange'
	| 'defaultValue'
	| 'type'
>
