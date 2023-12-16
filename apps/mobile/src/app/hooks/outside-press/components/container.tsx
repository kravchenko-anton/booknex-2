import React, { useEffect } from 'react'
import type { ViewProps } from 'react-native'
import { View } from 'react-native'
import useEvent from '../hooks/use-event'
import type { IEvent } from '../hooks/use-event-store'

export default function Container(properties: ViewProps) {
	const { events, skippedEventId, setSkippedEventId } = useEvent()
	const runEvents = () => {
		events.forEach((event: IEvent) => {
			if (event.id === (global as any).rnopSkippedEventId) return
			if (event.disabled) return

			event.onOutsidePress()
		})

		if ((global as any).rnopSkippedEventId) setSkippedEventId('')
	}

	useEffect(() => {
		if (skippedEventId) runEvents()
	}, [skippedEventId])

	return (
		<View {...properties} onTouchStart={runEvents}>
			{properties.children}
		</View>
	)
}
