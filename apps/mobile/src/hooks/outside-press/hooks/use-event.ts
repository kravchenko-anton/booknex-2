import { useContext } from 'react'
import type { EventContextType } from '../event-context'
import EventContext from '../event-context'

export default function useEvent() {
	return useContext(EventContext)
}
