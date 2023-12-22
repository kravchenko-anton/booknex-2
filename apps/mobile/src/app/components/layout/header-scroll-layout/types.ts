import type { ViewDefaultProperties } from '@/components/component-types'
import type { AnimatedHeaderProperties } from '@/components/header/animated-header/types'
import type { HeaderProperties } from '@/components/header/types'
import type { ReactNode } from 'react'

export interface LargeHeaderScrollLayoutProperties
	extends ViewDefaultProperties {
	animatedHeader: Omit<AnimatedHeaderProperties, 'scrollPosition'>
	headerChildren: ReactNode
}

export interface HeaderScrollLayoutProperties extends ViewDefaultProperties {
	animatedHeader: Omit<AnimatedHeaderProperties, 'scrollPosition'>
	header?: Omit<HeaderProperties, 'className' | 'style'>
}
