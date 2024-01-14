import type { IconProperties } from '@/components/ui/icon/types'

export interface HamburgerMenuProperties
	extends Pick<
		IconProperties,
		'size' | 'variant' | 'noPadding' | 'fullRounded' | 'className' | 'style'
	> {
	position: 'left' | 'right'
}
