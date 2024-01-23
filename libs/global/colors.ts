export const Color = {
	muted: '#303030' as '#303030',

	background: '#111111' as '#111111',
	foreground: '#202020' as '#202020',
	primary: '#5e548e' as '#5e548e',
	secondary: '#685369' as '#685369',

	black: '#000000' as '#000000',
	gray: '#9F9F9F' as '#9F9F9F',
	white: '#ffffff' as '#ffffff',

	danger: '#DC3F41' as '#DC3F41',
	success: '#4CAF50' as '#4CAF50',
	warning: '#FFBE0B' as '#FFBE0B',
	transparent: 'transparent' as 'transparent'
}

export const InnerColor = {
	foreground: Color.white,
	muted: Color.white,
	background: Color.white,
	primary: Color.white,
	secondary: Color.white,

	black: Color.white,
	gray: Color.white,
	white: Color.black,

	danger: Color.white,
	success: Color.white,
	warning: Color.black,
	transparent: Color.white,

	// icons
	'white-outlined': Color.white
}

export type LineColorType = {
	[K in keyof typeof Color]: (typeof Color)[K]
}[keyof typeof Color]

export type ClampPaletteType = 'foreground' | 'background' | 'muted'

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
