import { authRoutes } from '@/navigation/auth-routes'
import BottomMenu from '@/navigation/bottom-menu/bottom-menu'
import { modalRoutes } from '@/navigation/modal-routes'
import type { TypeRootStackParameterListType } from '@/navigation/navigation-types'
import { routes } from '@/navigation/user-routes'
import { getRefreshToken } from '@/screens/auth/store/auth-helper'
import { useAuthStore } from '@/screens/auth/store/auth-store'
import { useReadingProgressStore } from '@/screens/reading/store/progress-store'
import { Loader } from '@/ui'
import { historyByLatestSorting } from '@/utils'
import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Color } from 'global/colors'
import { useEffect, useState, type FC } from 'react'
import BootSplash from 'react-native-bootsplash'
import {
	SafeAreaProvider,
	initialWindowMetrics
} from 'react-native-safe-area-context'

const authRequiredRoutes = new Set(routes.map(route => route.name))
const Stack = createNativeStackNavigator<TypeRootStackParameterListType>()

const noBottomMenuRoutes = new Set(['Reader', 'BookReview', 'Search'])

const Navigation: FC = () => {
	const { user, logout } = useAuthStore(state => ({
		user: state.user,
		logout: state.logout
	}))
	const [initialHistory] = useState(useReadingProgressStore.getState().history) // eslint-disable-line
	const latestHistory = historyByLatestSorting(initialHistory).find(
		h => h.startFromReadingScreen
	)
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		user ? 'Featured' : 'Welcome'
	)
	const checkRefreshToken = async (
		route: keyof TypeRootStackParameterListType
	) => {
		if (!route || !authRequiredRoutes.has(route)) return
		const refreshToken = await getRefreshToken()
		if (!refreshToken && user) logout()
	}

	const navReference =
		useNavigationContainerRef<TypeRootStackParameterListType>()

	useEffect(() => {
		const listener = navReference.addListener('state', () => {
			const route = navReference.getCurrentRoute()
				?.name as keyof TypeRootStackParameterListType

			setCurrentRoute(route)
			checkRefreshToken(route)
		})

		return () => navReference.removeListener('state', listener)
	}, [])
	console.log('initialHistory', initialHistory)

	return (
		<SafeAreaProvider
			initialMetrics={initialWindowMetrics}
			style={{
				backgroundColor: Color.background
			}}>
			<NavigationContainer
				ref={navReference}
				fallback={<Loader />}
				onReady={() => {
					if (user && latestHistory)
						navReference.navigate('Reader', {
							slug: latestHistory.bookSlug,
							initialScrollPosition: latestHistory.scrollPosition
						})
					BootSplash.hide({ fade: true })
				}}>
				<Stack.Navigator
					initialRouteName={user ? 'Featured' : 'Welcome'}
					screenOptions={{
						animation: 'fade',
						headerShown: false,
						statusBarColor: Color.background,
						statusBarTranslucent: false,
						statusBarAnimation: 'fade'
					}}>
					{user
						? routes.map(({ options, ...route }) => (
								<Stack.Screen
									key={route.name}
									options={{
										contentStyle: {
											backgroundColor: Color.background
										},
										...options,
										navigationBarColor: Color.background
									}}
									{...route}
								/>
							))
						: authRoutes.map(({ options, ...route }) => (
								<Stack.Screen
									key={route.name}
									options={{
										contentStyle: {
											backgroundColor: Color.background
										},
										...options,
										navigationBarColor: Color.background
									}}
									{...route}
								/>
							))}
					{modalRoutes.map(({ options, ...route }) => (
						<Stack.Screen
							key={route.name}
							options={{
								presentation: 'containedTransparentModal',
								...options
							}}
							{...route}
						/>
					))}
				</Stack.Navigator>
			</NavigationContainer>
			{user && currentRoute && !noBottomMenuRoutes.has(currentRoute) ? (
				<BottomMenu nav={navReference.navigate} currentRoute={currentRoute} />
			) : null}
		</SafeAreaProvider>
	)
}

export default Navigation
