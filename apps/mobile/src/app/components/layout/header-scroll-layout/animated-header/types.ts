import type { ViewDefaultProperties } from '@/components/component-types'

export interface AnimatedHeaderProperties
	extends Pick<ViewDefaultProperties, 'style' | 'className'> {
	scrollPosition: { value: number }
	title: string
	transientValue: number
}
