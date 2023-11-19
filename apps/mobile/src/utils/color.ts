import { theme } from '../../tailwind.config'

export interface ColorsType {
	alert: '#DC3F41'
	black: '#000000'
	canvas: '#F9EFE8'
	dust: '#F2E4DC'
	gray: '#666666'
	highlight: '#FFBE0B'
	pale: '#FDF7F4'
	primary: '#2B6B76'
	secondary: '#75471E'
	transparent: 'transparent'
	white: '#ffffff'
}

export type LineColorType =
	| '#666666'
	| '#2B6B76'
	| '#75471E'
	| '#F2E4DC'
	| '#FDF7F4'
	| '#F9EFE8'
	| '#000000'
	| '#ffffff'
	| '#DC3F41'
	| '#FFBE0B'
	| 'transparent'

export interface ColorProperties {
	color?: string | LineColorType
}

export const Color = theme.colors as ColorsType
