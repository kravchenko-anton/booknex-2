import type { ViewDefaultProperties } from '@/components/component-types'
import { HamburgerMenuProperties } from '@/components/hamburger-menu/hamburger-menu-types'
import { IconProperties } from '@/types/global'
import { ColorProperties } from 'ui/colors'

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
