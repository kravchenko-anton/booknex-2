export const Color = {
	foreground: '#1F1F1F' as '#1f1f1f',
	vibrant: '#2F2F2F' as '#282828',
	shade: '#282828' as '#1F1F1F',
	background: '#0f0f0f' as '#0f0f0f',
	primary: '#ca2828' as '#ca2828',
	secondary: '#780000' as '#780000',

	black: '#000000' as '#000000',
	gray: '#959caf' as '#959caf',
	white: '#ffffff' as '#ffffff',

	danger: '#DC3F41' as '#DC3F41',
	success: '#4CAF50' as '#4CAF50',
	warning: '#FFBE0B' as '#FFBE0B',
	transparent: 'transparent' as 'transparent'
}

export const InteriorColor = {
	foreground: Color.white,
	vibrant: Color.white,
	shade: Color.white,
	background: Color.white,
	primary: Color.white,
	secondary: Color.white,

	black: Color.white,
	gray: Color.black,
	white: Color.black,

	danger: Color.white,
	success: Color.white,
	warning: Color.white,
	transparent: Color.white
}

export type LineColorType = {
	[K in keyof typeof Color]: (typeof Color)[K]
}[keyof typeof Color]

export type PickLineColorsTyle<T> = {
	[K in keyof T]: T[K] extends LineColorType ? T[K] : never
}

export interface ColorProperties {
	color?: LineColorType | string
}
