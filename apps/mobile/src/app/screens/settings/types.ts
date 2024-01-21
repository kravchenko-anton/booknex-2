import type {
	PressableDefaultProperties,
	ViewDefaultProperties
} from '@/components/component-types'
import type { FC } from 'react'
import type { SvgProps } from 'react-native-svg'

export interface ListCategoryItemTypes extends ViewDefaultProperties {
	title: string
}

export interface ListItemTypes
	extends Omit<PressableDefaultProperties, 'pointerEvents' | 'style'> {
	title: string
	bordered?: boolean
	icon: FC<SvgProps>
}
