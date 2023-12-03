export const Color = {
	foreground: '#23272f' as '#23272f',
	vibrant: '#374151' as '#374151',
	shade: '#16181d' as '#16181d',
	background: '#191c22' as '#191c22',
	primary: '#0d6d8c' as '#0d6d8c',
	secondary: '#0d6d8c' as '#0d6d8c',

	black: '#000000' as '#000000',
	gray: '#90989f' as '#90989f',
	white: '#ffffff' as '#ffffff',

	danger: '#DC3F41' as '#DC3F41',
	success: '#4CAF50' as '#4CAF50',
	warning: '#FFBE0B' as '#FFBE0B',
	transparent: 'transparent' as 'transparent'
}

export type LineColorType = {
	[K in keyof typeof Color]: (typeof Color)[K]
}[keyof typeof Color]

export interface ColorProperties {
	color?: LineColorType | string
}
