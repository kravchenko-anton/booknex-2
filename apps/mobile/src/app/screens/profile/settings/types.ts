import type {
	PressableDefaultProperties,
	ViewDefaultProperties
} from '@/components/component-types'
import type { FC } from 'react'

export interface ListCategoryItemTypes extends ViewDefaultProperties {
	title: string
}

export interface ListItemTypes extends PressableDefaultProperties {
	title: string
	icon: FC
}
