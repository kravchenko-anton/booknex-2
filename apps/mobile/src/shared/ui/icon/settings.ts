import type { IconProperties } from './types'

export const settings: {
	colors: Record<IconProperties['variant'], string>
	padding: Record<IconProperties['size'], string>
	size: Record<IconProperties['size'], number>
} = {
	colors: {
		foreground: 'bg-foreground border-[1px] border-muted',
		muted: 'bg-muted border-[1px] border-foreground',
		'white-outlined': 'bg-transparent border-white border-[1px]',
		background: 'bg-background',
		transparent: 'bg-transparent'
	},
	padding: {
		sm: 'p-2.5',
		md: 'p-3',
		lg: 'p-4'
	},
	size: {
		sm: 20,
		md: 24,
		lg: 28
	}
}
