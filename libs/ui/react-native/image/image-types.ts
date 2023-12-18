import type { ImageDefaultProperties } from '@/components/component-types.ts'
import type { Dimensions } from '@/types.ts/global'

export interface ImageTypes
	extends Omit<ImageDefaultProperties, 'source'>,
		Dimensions {
	fullSize?: boolean
	url: string
}
