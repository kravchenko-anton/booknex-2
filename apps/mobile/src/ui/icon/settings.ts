import type { IconProperties } from './types'

export const settings: {
	colors: Record<Required<IconProperties>['variant'], string>
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
		sm: 'p-2',
		md: 'p-2.5',
		lg: 'p-3'
	},
	size: {
		sm: 20,
		md: 22,
		lg: 26
	}
}
