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

export type LineColorType = {
	[K in keyof typeof Color]: (typeof Color)[K]
}[keyof typeof Color]

export type PickLineColorsType<T> = {
	[K in keyof T]: T[K] extends LineColorType ? T[K] : never
}

export interface ColorProperties {
	color?: LineColorType | string
}
