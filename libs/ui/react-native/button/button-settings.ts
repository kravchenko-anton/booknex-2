import { Color } from 'ui/colors'

export const BackgroundColor = {
	primary: Color.primary,
	secondary: Color.secondary,
	ghost: Color.vibrant,
	dust: Color.foreground,
	pale: Color.shade,
	danger: Color.danger,
	warning: Color.warning,
	success: Color.primary
}

export const TextColor = {
	primary: Color.white,
	secondary: Color.white,
	ghost: Color.white,
	dust: Color.white,
	pale: Color.white,
	danger: Color.white,
	warning: Color.white,
	success: Color.white
}

export const TextWeight = {
	small: 'medium' as const,
	medium: 'semiBold' as const,
	large: 'bold' as const
}

export const TextSize = {
	small: 16,
	medium: 20,
	large: 24
}
