import type { IconProperties } from './types'

export const settings: {
	colors: Record<IconProperties['variant'], string>
	padding: Record<IconProperties['size'], string>
	size: Record<IconProperties['size'], number>
} = {
	colors: {
		gray: 'bg-gray border-vibrant',
		foreground: 'bg-foreground',
		vibrant: 'bg-vibrant',
		'white-outlined': 'bg-transparent border-white border-[1px]',
		shade: 'bg-shade',
		background: 'bg-background'
	},
	padding: {
		sm: 'p-2',
		md: 'p-2.5',
		lg: 'p-4'
	},
	size: {
		sm: 18,
		md: 26,
		lg: 30
	}
}
