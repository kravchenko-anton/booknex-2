import React from 'react'
import type { View } from 'react-native'
import { useFocusEffect } from './useFocusEffect'
import { register, unregister } from './utils/collection'

type HookConfig = {
	triggerOnUnmount?: boolean
	triggerOnBlur?: boolean
}

export const useClickOutside = <T = View>(
	callback: () => void,
	config?: HookConfig
): React.RefObject<T> => {
	const callbackReference = React.useRef(callback)
	callbackReference.current = callback
	const callbackRegisterWrapper = () => callbackReference.current()

	const reference = React.useRef<T>(null)

	useFocusEffect(
		() => {
			if (!(config?.triggerOnBlur)) return
			register(reference, callbackRegisterWrapper)
		},
		() => {
			if (!(config?.triggerOnBlur)) return
			callbackRegisterWrapper()
			unregister(reference)
		}
	)
	React.useEffect(() => {
		register(reference, callbackRegisterWrapper)
		return () => {
			unregister(reference)
			if (!(config?.triggerOnUnmount)) return
			callbackRegisterWrapper()
		}
	}, [config?.triggerOnUnmount])

	return reference
}
