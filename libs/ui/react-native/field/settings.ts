import type { FieldProperties } from './types'

export const settings: {
	colors: Record<FieldProperties<never>['variant'], string>
} = {
	colors: {
		gray: 'bg-gray',
		foreground: 'bg-foreground',
		vibrant: 'bg-vibrant',
		shade: 'bg-shade',
		background: 'bg-background'
	}
}
