import type { ButtonProperties } from './types'

export const settings: {
	colors: Record<ButtonProperties['variant'], string>
	size: Record<ButtonProperties['size'], string>
	iconSize: Record<ButtonProperties['size'], number>
} = {
	colors: {
		foreground:
			'bg-foreground border-[1px] border-vibrant text-white hover:bg-vibrant',
		vibrant:
			'bg-vibrant border-[1px] border-foreground text-white hover:bg-foreground',
		shade:
			'bg-shade text-white border-[1px] border-foreground hover:bg-foreground',
		primary:
			'bg-primary text-white border-[1px] border-transparent hover:bg-secondary',
		secondary:
			'bg-secondary text-white border-[1px] border-transparent hover:bg-primary',
		danger:
			'bg-danger text-white border-[1px] border-transparent hover:bg-danger',
		background:
			'bg-background border-[1px] border-transparent text-white hover:bg-vibrant',
		success:
			'bg-success text-white border-[1px] border-transparent hover:bg-success',
		warning:
			'bg-warning text-white border-[1px] border-transparent hover:bg-warning'
	},
	size: {
		sm: 'px-3 py-1.5 text-sm',
		md: 'px-4 py-2 text-md',
		lg: 'px-5 py-3 text-lg'
	},
	iconSize: {
		sm: 16,
		md: 18,
		lg: 20
	}
}
