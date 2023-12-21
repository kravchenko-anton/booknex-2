import type {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	InputHTMLAttributes
} from 'react'

export type DefaultButtonProperties = Pick<
	DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
	'onClick' | 'type' | 'disabled' | 'children' | 'className' | 'style'
>

export type DefaultInputProperties = Pick<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	| 'onClick'
	| 'onBlur'
	| 'onFocus'
	| 'style'
	| 'placeholder'
	| 'disabled'
	| 'className'
	| 'value'
	| 'onChange'
	| 'defaultValue'
	| 'type'
>
