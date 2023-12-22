import { HamburgerMenuElementType } from '@/types/global'
import { ColorProperties } from 'ui/colors'

export interface HamburgerMenuProperties extends ColorProperties {
	elements: HamburgerMenuElementType[]
	position: 'left' | 'right'
}
