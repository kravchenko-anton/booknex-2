import type { ViewDefaultProperties } from '@/components/component-types'
import type { ReactNode } from 'react'

export interface HeaderProperties
	extends Pick<ViewDefaultProperties, 'style' | 'className'> {
	children?: ReactNode
}
