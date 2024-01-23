import type { ClampPaletteType } from 'global/colors'

export const settings: {
	colors: Record<ClampPaletteType, string>
} = {
	colors: {
		foreground:
			'bg-foreground placeholder-white text-white border-[1px] border-muted hover:border-muted focus:border-muted',
		muted:
			'bg-muted placeholder-white text-white border-[1px] border-foreground hover:border-gray focus:border-gray',
		background:
			'bg-background border-[1px] border-foreground placeholder-white text-white hover:border-foreground focus:border-foreground'
	}
}
