import type { AnimatedHeaderProperties } from '@/components/header/animated-header/animated-header-types'
import type { HeaderProperties } from '@/components/header/header-types'
import type { ViewDefaultProperties } from '@/types/component-types'
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
