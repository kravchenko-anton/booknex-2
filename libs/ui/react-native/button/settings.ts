import type { ButtonProperties } from './types'

export const settings: {
	colors: Record<ButtonProperties['variant'], string>
	titleSize: Record<ButtonProperties['size'], number>
	padding: Record<ButtonProperties['size'], string>
	iconSize: Record<ButtonProperties['size'], number>
} = {
	colors: {
		foreground: 'bg-foreground border-[1px] border-vibrant',
		vibrant: 'bg-vibrant border-[1px] border-foreground',
		shade: 'bg-shade border-[1px] border-foreground',
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
		sm: 'py-1.5 px-3',
		md: 'py-2 px-4',
		lg: 'py-3 px-5'
	}
}
