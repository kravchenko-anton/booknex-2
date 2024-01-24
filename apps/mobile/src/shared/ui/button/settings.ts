import type { ButtonProperties } from './types'

export const settings: {
	colors: Record<ButtonProperties['variant'], string>
	titleSize: Record<ButtonProperties['size'], number>
	padding: Record<ButtonProperties['size'], string>
	iconSize: Record<ButtonProperties['size'], number>
} = {
	colors: {
		foreground: 'bg-foreground border-[1px] border-muted',
		muted: 'bg-muted border-[1px] border-foreground',
		primary: 'bg-primary border-[1px] border-transparent',
		secondary: 'bg-secondary border-[1px] border-transparent',
		danger: 'bg-danger border-[1px] border-transparent',
		background: 'bg-background border-[1px] border-transparent',
		success: 'bg-success border-[1px] border-transparent',
		warning: 'bg-warning border-[1px] border-transparent'
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
