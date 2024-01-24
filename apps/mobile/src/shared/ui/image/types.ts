import type { ImageDefaultProperties } from '@/shared/types/component-types'

export interface DimensionsType {
	width?: number
	height?: number
}

export interface Types
	extends Omit<ImageDefaultProperties, 'source'>,
		DimensionsType {
	fullSize?: boolean
	url?: string
}
