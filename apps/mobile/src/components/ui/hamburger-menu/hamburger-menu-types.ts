import type { HamburgerMenuElementType } from '@/types/global'
import type { ColorProperties } from '@/utils/color'

export interface HamburgerMenuProperties extends ColorProperties {
	elements: HamburgerMenuElementType[]
	position: 'left' | 'right'
}
