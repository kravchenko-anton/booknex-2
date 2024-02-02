import { useCheckAuth } from '@/features/auth/provider/auth-provider'
import { authRoutes } from '@/features/navigation/auth-routes'
import BottomMenu from '@/features/navigation/bottom-menu/bottom-menu'
import type { TypeRootStackParameterList } from '@/features/navigation/types'
import { routes } from '@/features/navigation/user-routes'
import { useAuth } from '@/shared/hooks'
import { Loader } from '@/shared/ui'
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
				ref={navReference}
				fallback={<Loader />}
				onReady={() => BootSplash.hide({ fade: true })}
			>
				<Stack.Navigator
					initialRouteName={user ? 'Featured' : 'Welcome'}
					screenOptions={{
						animation: 'fade_from_bottom',
						presentation: 'transparentModal',
						headerShown: false,
						contentStyle: {
							backgroundColor: Color.background
						},
						statusBarColor: Color.background
					}}
				>
					{user
						? routes.map(({ options, ...route }) => (
								<Stack.Screen key={route.name} {...route} />
							))
						: authRoutes.map(({ options, ...route }) => (
								<Stack.Screen key={route.name} {...route} />
							))}
				</Stack.Navigator>
			</NavigationContainer>
			{user &&
				currentRoute &&
				!['Reader', 'Feedback', 'Search'].includes(currentRoute) && (
					<BottomMenu nav={navReference.navigate} currentRoute={currentRoute} />
				)}
		</SafeAreaProvider>
	)
}

export default Navigation
