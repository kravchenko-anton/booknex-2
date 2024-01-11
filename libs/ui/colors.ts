export const Color = {
	foreground: '#242424' as '#323232',
	vibrant: '#323232' as '#242424',
	shade: '#131313' as '#131313',
	background: '#0d0d0d' as '#0d0d0d',
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
	transparent: Color.white,

	// icons
	'white-outlined': Color.white
}

export type LineColorType = {
	[K in keyof typeof Color]: (typeof Color)[K]
}[keyof typeof Color]

export type ClampPaletteType = 'foreground' | 'background' | 'vibrant' | 'shade'

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
