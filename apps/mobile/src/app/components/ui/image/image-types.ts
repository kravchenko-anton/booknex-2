import type { ImageDefaultProperties } from '@/components/component-types'
import type { Dimensions } from '@/types/global'

export interface ImageTypes
	extends Omit<ImageDefaultProperties, 'source'>,
		Dimensions {
	fullSize?: boolean
	url: string
}
