import type { ImageDefaultProperties } from '@/components/component-types.ts'

export interface DimensionsType {
	width?: number
	height?: number
}

export interface ImageTypes
	extends Omit<ImageDefaultProperties, 'source'>,
		DimensionsType {
	fullSize?: boolean
	url: string
}
