import React from 'react'
import type { ViewProps } from 'react-native'
import EventContext from '../event-context'
import useEventStore from '../hooks/use-event-store'
import Container from './container'

export default function EventProvider(properties: ViewProps) {
	const { style, ...rest } = properties
	const eventStore = useEventStore()

	return (
		<EventContext.Provider value={eventStore}>
			<Container className='flex-1' {...rest}>
				{properties.children}
			</Container>
		</EventContext.Provider>
	)
}
