import type { ClampPaletteType } from '../../colors'

export const settings: {
	colors: Record<ClampPaletteType, string>
} = {
	colors: {
		gray: 'bg-gray placeholder-white text-white border-2 border-transparent hover:border-vibrant focus:border-vibrant',
		foreground:
			'bg-foreground placeholder-white text-white border-2 border-transparent hover:border-vibrant focus:border-vibrant',
		vibrant:
			'bg-vibrant placeholder-white text-white border-2 border-transparent hover:border-gray focus:border-gray',
		shade:
			'bg-shade placeholder-white text-white border-2 border-transparent hover:border-foreground focus:border-foreground',
		background:
			'bg-background border-2 border-transparent placeholder-white text-white hover:border-foreground focus:border-foreground'
	}
}
