import { useAuth } from '@/hooks/useAuth'
import Login from '@/screens/auth/login/login'
import Register from '@/screens/auth/register/register'
import Welcome from '@/screens/auth/welcome/welcome'
import { Color } from '@/utils/color'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { FC } from 'react'

import type { TypeRootStackParameterList } from './navigation-types'
import { routes, userRoutes } from './user-routes'

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
				user.isAdmin ? (
					routes.map(route => <Stack.Screen key={route.name} {...route} />)
				) : (
					userRoutes.map(route => <Stack.Screen key={route.name} {...route} />)
				)
			) : (
				<>
					<Stack.Screen name='Welcome' component={Welcome} />
					<Stack.Screen name='Login' component={Login} />
					<Stack.Screen name='Registration' component={Register} />
				</>
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator
