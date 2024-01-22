import { useAuth } from '@/hooks/useAuth'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Color } from 'global/colors'
import type { FC } from 'react'

import type { TypeRootStackParameterList } from './types'
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
					backgroundColor: Color.background
				}
			}}
		>
			{user
				? routes.map(route => (
						<Stack.Screen
							key={route.name}
							options={{
								statusBarColor: Color.shade
							}}
							{...route}
						/>
					))
				: authRoutes.map(route => <Stack.Screen key={route.name} {...route} />)}
		</Stack.Navigator>
	)
}

export default PrivateNavigator
