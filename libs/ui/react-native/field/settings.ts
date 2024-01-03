import type { FieldProperties } from './types'

export const settings: {
	colors: Record<FieldProperties<never>['variant'], string>
} = {
	colors: {
		foreground: 'bg-foreground border-[1px] border-vibrant',
		vibrant: 'bg-vibrant border-[1px] border-foreground',
		shade: 'bg-shade border-[1px] border-foreground',
		background: 'bg-background border-[1px] border-foreground'
	}
}
