import { useCallback, useEffect, useRef } from 'react'
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native'

export const useFocusEffect = (
	activeCallback: () => void,
	inactiveCallback: () => void
) => {
	const appState = useRef(AppState.currentState)
	const handleAppStateChange = useCallback(
		(nextAppState: AppStateStatus) => {
			if (
				/inactive|background/.test(appState.current) &&
				nextAppState === 'active'
			) {
				activeCallback()
			}
			if (
				appState.current === 'active' &&
				/inactive|background/.test(nextAppState)
			) {
				inactiveCallback()
			}
			appState.current = nextAppState
		},
		[activeCallback, inactiveCallback]
	)
	useEffect(() => {
		const listener = AppState.addEventListener('change', handleAppStateChange)
		return () => {
			listener.remove()
		}
	}, [handleAppStateChange])
}
