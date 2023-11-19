import { AnimatedView } from '@/types/component-types'
import React, { useEffect, useRef } from 'react'
import type { ViewProps } from 'react-native'
import useEvent from '../hooks/use-event'

interface IOutsidePressHandlerProperties extends ViewProps {
	onOutsidePress: () => void
	disabled?: boolean
}

export default function OutsidePressHandler(
	properties: IOutsidePressHandlerProperties
) {
	const { children, onOutsidePress, disabled = false } = properties
	const id: string = useRef(Math.random().toString()).current
	const { appendEvent, removeEvent, setSkippedEventId } = useEvent()
	const setSkippedEventIdFunction = () => setSkippedEventId(id)

	useEffect(() => {
		appendEvent({ id, onOutsidePress, disabled })

		return () => removeEvent(id)
	}, [onOutsidePress, disabled])

	return (
		<AnimatedView {...properties} onTouchStart={setSkippedEventIdFunction}>
			{children}
		</AnimatedView>
	)
}
