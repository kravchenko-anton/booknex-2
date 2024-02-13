import type { FunctionType } from 'global/types'
import type { RefObject } from 'react'
import type { GestureResponderEvent } from 'react-native'

export type ComponentReference = RefObject<any> | null

let collection: { ref: ComponentReference; cb: FunctionType }[] = []

export let isTouch: boolean | null
export const setIsTouch = (value: boolean) => (isTouch = value)

export const onTouch = (event: GestureResponderEvent) => {
	if (!isTouch) return
	const { pageX, pageY } = event.nativeEvent
	for (const item of collection) {
		item.ref?.current?.measure(
			(
				_x: unknown, // eslint-disable-line @typescript-eslint/naming-convention
				_y: unknown, // eslint-disable-line @typescript-eslint/naming-convention
				width: number,
				height: number,
				x: number,
				y: number
			) => {
				if (pageX < x || pageX > x + width || pageY < y || pageY > y + height)
					item.cb()
			}
		)
	}
	isTouch = null
}

export const register: (
	reference: ComponentReference,
	callback: FunctionType
) => void = (reference, callback) => {
	if (collection.some(c => c.ref === reference)) return
	collection.push({ ref: reference, cb: callback })
}

export const unregister: (
	reference: ComponentReference
) => void = referenceToRemove =>
	(collection = collection.filter(({ ref }) => ref !== referenceToRemove))
