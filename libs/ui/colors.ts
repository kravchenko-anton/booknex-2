export const Color = {
	foreground: '#26262C' as '#26262C',
	vibrant: '#4d5058' as '#4d5058',
	shade: '#1b1b1f' as '#1b1b1f',
	background: '#151517' as '#151517',
	primary: '#685369' as '#685369',
	secondary: '#605770' as '#605770',

	black: '#000000' as '#000000',
	gray: '#959caf' as '#959caf',
	white: '#ffffff' as '#ffffff',

	danger: '#DC3F41' as '#DC3F41',
	success: '#4CAF50' as '#4CAF50',
	warning: '#FFBE0B' as '#FFBE0B',
	transparent: 'transparent' as 'transparent'
}

export const InnerColor = {
	foreground: Color.white,
	vibrant: Color.white,
	shade: Color.white,
	background: Color.white,
	primary: Color.white,
	secondary: Color.white,

	black: Color.white,
	gray: Color.white,
	white: Color.black,

	danger: Color.white,
	success: Color.white,
	warning: Color.black,
	transparent: Color.white
}

export type LineColorType = {
	[K in keyof typeof Color]: (typeof Color)[K]
}[keyof typeof Color]

export type ClampPaletteType =
	| 'foreground'
	| 'background'
	| 'vibrant'
	| 'gray'
	| 'shade'

export type VividPaletteType =
	| 'primary'
	| 'secondary'
	| 'danger'
	| 'success'
	| 'warning'
	| ClampPaletteType

export interface ColorProperties {
	color?: LineColorType | string
}
