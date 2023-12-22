import type { FlatlistDefaultProperties } from '@/components/component-types.ts'
import type { RefObject } from 'react'
import type { FlatList, ListRenderItem } from 'react-native'
import type { TitleProperties } from '../title/types'

interface FlatlistTitleType extends Omit<TitleProperties, 'children'> {
	mb?: number
	text?: string
}

export interface FlatListProperties<T> extends FlatlistDefaultProperties<T> {
	data: T[] | undefined
	Ref?: RefObject<FlatList<T>>
	elementSpacing?: number
	title?: FlatlistTitleType
	mt?: number
	px?: number
	renderItem: ListRenderItem<T> | null
}
