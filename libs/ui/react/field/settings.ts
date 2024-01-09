import type { ClampPaletteType } from '../../colors'

export const settings: {
	colors: Record<ClampPaletteType, string>
} = {
	colors: {
		foreground:
			'bg-foreground placeholder-white text-white border-[1px] border-vibrant hover:border-vibrant focus:border-vibrant',
		vibrant:
			'bg-vibrant placeholder-white text-white border-[1px] border-foreground hover:border-gray focus:border-gray',
		shade:
			'bg-shade placeholder-white text-white border-[1px] border-foreground hover:border-foreground focus:border-foreground',
		background:
			'bg-background border-[1px] border-foreground placeholder-white text-white hover:border-foreground focus:border-foreground'
	}
}
