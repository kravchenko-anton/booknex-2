import { useAuth } from '@/hooks/useAuth'
import { Color } from '@/ui/colors'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { FC } from 'react'

import type { TypeRootStackParameterList } from './navigation-types'
import { authRoutes, routes } from './user-routes'

const Stack = createNativeStackNavigator<TypeRootStackParameterList>()

const PrivateNavigator: FC = () => {
	const { user } = useAuth()

	return (
		<Stack.Navigator
			initialRouteName={user ? 'Featured' : 'Welcome'}
			screenOptions={{
				animation: 'fade',
				headerShown: false,
				contentStyle: {
					backgroundColor: Color.canvas
				}
			}}>
			{user ? (
				routes.map(route => <Stack.Screen key={route.name} {...route} />)
				) : (
			authRoutes.map(route => <Stack.Screen key={route.name} {...route} />)
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator
