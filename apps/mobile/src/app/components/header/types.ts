import type { ViewDefaultProperties } from '@/components/component-types'
import type { HamburgerMenuProperties } from '@/components/dropdown/types'
import type { IconProperties } from '@/types/global'
import type { ColorProperties } from 'ui/colors'

export type HeaderElementType = {
	icon?: Omit<IconProperties, 'color' | 'size'>
} & {
	hamburger?: Omit<HamburgerMenuProperties, 'position' | 'color'>
} & {
	title?: string // title of the header
} & {
	sharing?: string // message to share
}

export type LeftHeaderElementType = {
	back?: boolean
} & HeaderElementType

export interface HeaderProperties
	extends ColorProperties,
		Pick<ViewDefaultProperties, 'style' | 'className'> {
	left?: LeftHeaderElementType
	right?: HeaderElementType
}
