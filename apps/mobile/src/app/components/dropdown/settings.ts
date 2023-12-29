import type { HamburgerMenuProperties } from '@/components/dropdown/types'

export const settings: {
	colors: Record<HamburgerMenuProperties['variant'], string>
	padding: Record<HamburgerMenuProperties['size'], string>
	size: Record<HamburgerMenuProperties['size'], number>
} = {
	colors: {
		gray: 'bg-gray',
		foreground: 'bg-foreground',
		vibrant: 'bg-vibrant',
		'white-outlined': 'bg-transparent border-white border-[1px]',
		shade: 'bg-shade',
		transparent: 'bg-transparent',
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
