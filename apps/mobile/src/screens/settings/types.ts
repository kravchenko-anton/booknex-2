import type {
	PressableDefaultProperties,
	ViewDefaultProperties
} from '@/types/component-types'
import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'

export interface ListCategoryItemType extends ViewDefaultProperties {
	title: string
}

export interface ListItemType
	extends Omit<PressableDefaultProperties, 'pointerEvents' | 'style'> {
	title: string
	bordered?: boolean
	icon: FC<SvgProps>
}
