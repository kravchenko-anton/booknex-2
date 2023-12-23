import type { ClampPaletteType } from '../../colors'

export const settings: {
	colors: Record<ClampPaletteType, string>
	padding: Record<'sm' | 'md' | 'lg', string>
	size: Record<'sm' | 'md' | 'lg', number>
} = {
	colors: {
		gray: 'bg-gray border-vibrant',
		foreground: 'bg-foreground',
		vibrant: 'bg-vibrant',
		shade: 'bg-shade',
		background: 'bg-background'
	},
	padding: {
		sm: 'p-2',
		md: 'p-3',
		lg: 'p-4'
	},
	size: {
		sm: 18,
		md: 26,
		lg: 30
	}
}
