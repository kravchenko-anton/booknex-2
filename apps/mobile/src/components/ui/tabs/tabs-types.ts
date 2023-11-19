import type { ViewDefaultProperties } from '@/types/component-types'

export interface Route {
	component: JSX.Element,
	key: string,
	title: string
}
export interface TabsProperties extends ViewDefaultProperties {
	routes: Route[]
}
