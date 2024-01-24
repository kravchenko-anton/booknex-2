import type { Ref } from 'react'
import type { GestureResponderEvent } from 'react-native'

export type ComponentReference = Ref<any>

let collection: { ref: ComponentReference; cb: () => void }[] = []

export let isTouch: boolean | null
export const setIsTouch = (value: boolean) => (isTouch = value)

export const onTouch = (event: GestureResponderEvent) => {
	if (!isTouch) return
	const { pageX, pageY } = event.nativeEvent
	for (const item of collection) {
		// @ts-expect-error
		item.ref?.current?.measure(
			(_x, _y, width: number, height: number, x: number, y: number) => {
				if (pageX < x || pageX > x + width || pageY < y || pageY > y + height)
					item.cb()
			}
		)
	}
	isTouch = null
}

export const register: (
	reference: ComponentReference,
	callback: () => void
) => void = (reference, callback) => {
	if (collection.some(c => c.ref === reference)) return
	collection.push({ ref: reference, cb: callback })
}

export const unregister: (
	reference: ComponentReference
) => void = referenceToRemove =>
	(collection = collection.filter(({ ref }) => ref !== referenceToRemove))
