import type { HamburgerMenuElementType } from '@/types/global'

export interface BookLayoutProperties {
	author: {
		id: number
		name: string
		navigate: (id: number) => void
	}
	backgroundColor: string
	hamburgerMenuElements: HamburgerMenuElementType[]
	title: string
}
