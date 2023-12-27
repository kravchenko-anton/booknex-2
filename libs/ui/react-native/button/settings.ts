import type { VividPaletteType } from '../../colors'

export const settings: {
	colors: Record<VividPaletteType, string>
	titleSize: Record<'sm' | 'md' | 'lg', number>
	padding: Record<'sm' | 'md' | 'lg', string>
	iconSize: Record<'sm' | 'md' | 'lg', number>
} = {
	colors: {
		gray: 'bg-gray',
		foreground: 'bg-foreground',
		vibrant: 'bg-vibrant',
		shade: 'bg-shade',
		primary: 'bg-primary',
		secondary: 'bg-secondary',
		danger: 'bg-danger',
		background: 'bg-background',
		success: 'bg-success',
		warning: 'bg-warning'
	},
	iconSize: {
		sm: 16,
		md: 18,
		lg: 20
	},
	titleSize: {
		sm: 16,
		md: 20,
		lg: 24
	},
	padding: {
		sm: 'py-2 px-4',
		md: 'py-3 px-5',
		lg: 'py-4 px-6'
	}
}
