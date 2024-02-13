import { useEffect, useRef, type RefObject } from 'react'
import type { View } from 'react-native'
import { useFocusEffect } from './useFocusEffect'
import { register, unregister } from './utils/collection'

interface HookConfigType {
	triggerOnUnmount?: boolean
	triggerOnBlur?: boolean
}

export const useClickOutside = <T = View>(
	callback: () => void,
	config?: HookConfigType
): RefObject<T> => {
	const callbackReference = useRef(callback)
	callbackReference.current = callback
	const callbackRegisterWrapper = () => callbackReference.current()

	const reference = useRef<T>(null)

	useFocusEffect(
		() => {
			if (!config?.triggerOnBlur) return
			register(reference, callbackRegisterWrapper)
		},
		() => {
			if (!config?.triggerOnBlur) return
			callbackRegisterWrapper()
			unregister(reference)
		}
	)
	useEffect(() => {
		register(reference, callbackRegisterWrapper)
		return () => {
			unregister(reference)
			if (!config?.triggerOnUnmount) return
			callbackRegisterWrapper()
		}
	}, [config?.triggerOnUnmount])

	return reference
}
