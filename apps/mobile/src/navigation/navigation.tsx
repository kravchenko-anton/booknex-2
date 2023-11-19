import FullScreenLoader from '@/components/ui/loader/big-loader'
import { useAuth } from '@/hooks/useAuth'
import BottomMenu from '@/navigation/bottom-menu/bottom-menu'
import { useCheckAuth } from '@/providers/auth-provider'
import { FontProvider } from '@/providers/font-provider'
import { Color } from '@/utils/color'
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
	const fontLoad = FontProvider()

	if (!fontLoad) return <FullScreenLoader />
	return (
		<SafeAreaProvider
			initialMetrics={initialWindowMetrics}
			style={{
				backgroundColor: Color.canvas
			}}>
			<NavigationContainer ref={navReference} fallback={<FullScreenLoader />}>
				<PrivateNavigator />
			</NavigationContainer>
			{user && !!currentRoute && !(currentRoute === 'Reading') && (
				<BottomMenu nav={navReference.navigate} currentRoute={currentRoute} />
			)}
		</SafeAreaProvider>
	)
}

export default Navigation
