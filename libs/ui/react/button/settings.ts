import type { VividPaletteType } from '../../colorPalette'

export const settings: {
	colors: Record<VividPaletteType, string>
	size: Record<'sm' | 'md' | 'lg', string>
	iconSize: Record<'sm' | 'md' | 'lg', number>
} = {
	colors: {
		gray: 'bg-gray text-white hover:bg-vibrant',
		foreground: 'bg-foreground text-white hover:bg-vibrant',
		vibrant: 'bg-vibrant text-white hover:bg-foreground',
		shade: 'bg-shade text-white hover:bg-foreground',
		primary: 'bg-primary text-white hover:bg-secondary',
		secondary: 'bg-secondary text-white hover:bg-primary',
		danger: 'bg-danger text-white hover:bg-danger',
		background: 'bg-background text-white hover:bg-vibrant',
		success: 'bg-success text-white hover:bg-success',
		warning: 'bg-warning text-white hover:bg-warning'
	},
	size: {
		sm: 'px-2 py-0.5 text-sm',
		md: 'px-3 py-2 text-md',
		lg: 'px-4 py-3 text-lg'
	},
	iconSize: {
		sm: 16,
		md: 18,
		lg: 20
	}
}
