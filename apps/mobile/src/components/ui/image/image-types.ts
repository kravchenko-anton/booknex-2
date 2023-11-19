import type { ImageDefaultProperties } from '@/types/component-types'
import type { Dimensions } from '@/types/global'

export interface ImageTypes
	extends Omit<ImageDefaultProperties, 'source'>,
		Dimensions {
	fullSize?: boolean,
	url: string
}
