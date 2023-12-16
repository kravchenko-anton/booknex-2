import { useContext } from 'react'
import EventContext from '../event-context'

export default function useEvent() {
	return useContext(EventContext)
}
