import { useAuth } from '@/hooks/useAuth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { FC } from 'react'
import { Color } from 'ui/colors'

import type { TypeRootStackParameterList } from './types'
import { authRoutes, routes } from './user-routes'

const Stack = createNativeStackNavigator<TypeRootStackParameterList>()

const PrivateNavigator: FC = () => {
	const { user } = useAuth()

	return (
		<Stack.Navigator
			initialRouteName={user ? 'Featured' : 'Welcome'}
			screenOptions={{
				animation: 'ios',
				headerShown: false,
				contentStyle: {
					backgroundColor: Color.background
				}
			}}
		>
			{user
				? routes.map(route => <Stack.Screen key={route.name} {...route} />)
				: authRoutes.map(route => <Stack.Screen key={route.name} {...route} />)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator
