import { useAuth } from '@/hooks/useAuth'
import BottomMenu from '@/navigation/bottom-menu/bottom-menu'
import { useCheckAuth } from '@/providers/auth-provider'
import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import {
	SafeAreaProvider,
	initialWindowMetrics
} from 'react-native-safe-area-context'
import { Color } from 'ui/colors'
import { Loader } from 'ui/components'

import PrivateNavigator from './private-navigator'

const Navigation: FC = () => {
	const { user } = useAuth()
	const [currentRoute, setCurrentRoute] = useState<string | undefined>()

	const navReference = useNavigationContainerRef()
	useEffect(() => {
		const listener = navReference.addListener('state', () => {
			setCurrentRoute(navReference.getCurrentRoute()?.name)
		})
		return () => {
			navReference.removeListener('state', listener)
		}
	}, [])
	useCheckAuth()
	return (
		<SafeAreaProvider
			initialMetrics={initialWindowMetrics}
			style={{
				backgroundColor: Color.background
			}}
		>
			<NavigationContainer
				ref={navReference}
				fallback={<Loader size='screen' />}
			>
				<PrivateNavigator />
			</NavigationContainer>
			{user && !(currentRoute === 'Reading') && (
				<BottomMenu nav={navReference.navigate} currentRoute={currentRoute} />
			)}
		</SafeAreaProvider>
	)
}

export default Navigation
