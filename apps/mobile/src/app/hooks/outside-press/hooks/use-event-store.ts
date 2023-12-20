import { useMemo, useState } from 'react'

export interface IEvent {
	id: string
	onOutsidePress: () => void
	disabled: boolean
}

export default function useEventStore() {
	const [events, setEvents] = useState<IEvent[]>([])
	const [skippedEventId, setSkippedEventId] = useState<string>('')
	return useMemo(
		() => ({
			events,
			appendEvent: (newEvent: IEvent) =>
				setEvents(state => [...state, newEvent]),
			removeEvent: (id: string) =>
				setEvents(state => state.filter(event => event.id !== id)),
			skippedEventId,
			setSkippedEventId: (id: string) => {
				;(global as any).rnopSkippedEventId = id
				setSkippedEventId(id)
			}
		}),
		[skippedEventId, events]
	)
}