import type { HamburgerMenuProperties } from '@/components/ui/hamburger-menu/hamburger-menu-types'
import type { IconProperties } from '@/components/ui/icon/icon-types'
import type { ViewDefaultProperties } from '@/types/component-types'
import type { ColorProperties } from '@/utils/color'

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
