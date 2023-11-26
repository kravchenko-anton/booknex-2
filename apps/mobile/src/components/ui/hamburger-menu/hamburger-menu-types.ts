import type { HamburgerMenuElementType } from '@/types/global'
import type { ColorProperties } from '@/ui/colors'

export interface HamburgerMenuProperties extends ColorProperties {
	elements: HamburgerMenuElementType[]
	position: 'left' | 'right'
}
