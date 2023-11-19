import type { HeaderProperties } from '@/components/header/header-types'

export interface AnimatedHeaderProperties
	extends Pick<HeaderProperties, 'right'> {
	scrollPosition: { value: number },
	title: string,
	transientValue: number
}
