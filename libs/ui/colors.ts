export const Color = {
	foreground: '#282828' as '#282828',
	vibrant: '#4d5058' as '#4d5058',
	shade: '#1b1b1f' as '#1b1b1f',
	background: '#121212' as '#121212',
	primary: '#5e548e' as '#5e548e',
	secondary: '#685369' as '#685369',

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
