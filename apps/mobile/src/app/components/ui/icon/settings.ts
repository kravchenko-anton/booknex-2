import type { IconProperties } from './types'

export const settings: {
	colors: Record<IconProperties['variant'], string>
	padding: Record<IconProperties['size'], string>
	size: Record<IconProperties['size'], number>
} = {
	colors: {
		foreground: 'bg-foreground',
		vibrant: 'bg-vibrant',
		'white-outlined': 'bg-transparent border-white border-[1px]',
		shade: 'bg-shade',
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
