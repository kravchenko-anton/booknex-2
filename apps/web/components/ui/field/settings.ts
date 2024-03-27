import type { ClampPaletteType } from 'global/colors'

export const settings: {
	colors: Record<ClampPaletteType, string>
} = {
	colors: {
		foreground:
			'bg-foreground placeholder-white text-white border-[1px] border-bordered hover:border-bordered focus:border-bordered',
		muted:
			'bg-muted placeholder-white text-white border-[1px] border-bordered hover:border-bordered focus:border-gray',
		background:
			'bg-background border-[1px] border-bordered placeholder-white text-white hover:border-bordered focus:border-foreground'
	}
}
