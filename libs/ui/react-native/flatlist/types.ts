import type { FlatlistDefaultProperties } from '@/components/component-types.ts'
import type { RefObject } from 'react'
import type { FlatList, ListRenderItem } from 'react-native'

export interface FlatListProperties<T> extends FlatlistDefaultProperties<T> {
	data: T[] | undefined
	Ref?: RefObject<FlatList<T>>
	elementSpacing?: number
	title?: string
	mt?: number
	mb?: number
	px?: number
	renderItem: ListRenderItem<T> | null
}
