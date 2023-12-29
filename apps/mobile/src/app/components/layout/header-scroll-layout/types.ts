import type { ViewDefaultProperties } from '@/components/component-types'
import type { AnimatedHeaderProperties } from '@/components/layout/header-scroll-layout/animated-header/types'

export interface HeaderScrollLayoutProperties
	extends ViewDefaultProperties,
		Omit<AnimatedHeaderProperties, 'scrollPosition'> {}
