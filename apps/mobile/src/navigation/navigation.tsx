import { useAuth } from '@/hooks'
import { authRoutes } from '@/navigation/auth-routes'
import BottomMenu from '@/navigation/bottom-menu/bottom-menu'
import type { TypeRootStackParameterListType } from '@/navigation/types'
import { routes } from '@/navigation/user-routes'
import { Loader } from '@/ui'
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

const Stack = createNativeStackNavigator<TypeRootStackParameterListType>()

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
	//TODO: добавить проверку роута и делать редирект на нужный роут если юзера разлогинело
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
						animation: 'fade',
						presentation: 'transparentModal',
						headerShown: false,
						contentStyle: {
							backgroundColor: Color.background
						},
						statusBarColor: Color.background
					}}
				>
					{user
						? routes.map(({ ...route }) => (
								<Stack.Screen key={route.name} {...route} />
							))
						: authRoutes.map(({ ...route }) => (
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
