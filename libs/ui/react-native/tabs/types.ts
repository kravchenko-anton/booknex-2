import type { ViewDefaultProperties } from '@/components/component-types.ts'

export interface Route {
	component: JSX.Element
	key: string
	title: string
}

export interface TabsProperties extends ViewDefaultProperties {
	routes: Route[]
}
