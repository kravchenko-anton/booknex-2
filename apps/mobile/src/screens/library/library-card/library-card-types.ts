import type { PressableDefaultProperties } from '@/types/component-types'
import type { IconProperties } from '@/types/global'

export interface LibraryListElementType
	extends IconProperties,
		PressableDefaultProperties {
	count: number,
	name: string
}
