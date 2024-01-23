import { Loader } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import BottomMenu from '@/navigation/bottom-menu/bottom-menu'
import type { TypeRootStackParameterList } from '@/navigation/types'
import { authRoutes, modalRoutes, routes } from '@/navigation/user-routes'
import { useCheckAuth } from '@/providers/auth-provider'
import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Color } from 'global/colors'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import BootSplash from 'react-native-bootsplash'
import {
	SafeAreaProvider,
	initialWindowMetrics
} from 'react-native-safe-area-context'

const Stack = createNativeStackNavigator<TypeRootStackParameterList>()

const Navigation: FC = () => {
	const { user } = useAuth()
	const [currentRoute, setCurrentRoute] = useState<string | null>()

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
				onReady={() => BootSplash.hide({ fade: true })}
				ref={navReference}
				fallback={<Loader />}
			>
				<Stack.Navigator
					initialRouteName={user ? 'Featured' : 'Welcome'}
					screenOptions={{
						animation: 'fade_from_bottom',
						presentation: 'transparentModal',
						headerShown: false,
						statusBarColor: Color.background,
						contentStyle: {
							backgroundColor: Color.background
						}
					}}
				>
					{user
						? routes.map(route => <Stack.Screen key={route.name} {...route} />)
						: authRoutes.map(route => (
								<Stack.Screen key={route.name} {...route} />
							))}
					{modalRoutes.map(route => (
						<Stack.Screen
							options={{
								headerShown: false
							}}
							key={route.name}
							{...route}
						/>
					))}
				</Stack.Navigator>
			</NavigationContainer>
			{user && !['Reader', 'Feedback'].includes(currentRoute) && (
				<BottomMenu nav={navReference.navigate} currentRoute={currentRoute} />
			)}
		</SafeAreaProvider>
	)
}

export default Navigation
