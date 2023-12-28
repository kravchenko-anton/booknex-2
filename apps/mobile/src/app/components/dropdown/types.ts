import type { IconProperties } from '../../../../../../libs/ui/react-native/icon/types'

export interface HamburgerMenuProperties
	extends Pick<
		IconProperties,
		'size' | 'variant' | 'noPadding' | 'fullRounded' | 'className' | 'style'
	> {
	position: 'left' | 'right'
}
