import type { IconProperties } from './types'

export const settings: {
	colors: Record<IconProperties['variant'], string>
	padding: Record<IconProperties['size'], string>
	size: Record<IconProperties['size'], number>
} = {
	colors: {
		foreground: 'bg-foreground border-[1px] border-vibrant',
		vibrant: 'bg-vibrant border-[1px] border-foreground',
		'white-outlined': 'bg-transparent border-white border-[1px]',
		shade: 'bg-shade border-[1px] border-foreground',
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
