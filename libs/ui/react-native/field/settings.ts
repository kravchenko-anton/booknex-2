import type { ClampPaletteType } from '../../colors'

export const settings: {
	colors: Record<ClampPaletteType, string>
} = {
	colors: {
		gray: 'bg-gray',
		foreground: 'bg-foreground',
		vibrant: 'bg-vibrant',
		shade: 'bg-shade',
		background: 'bg-background'
	}
}
