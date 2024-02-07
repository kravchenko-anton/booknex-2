import Login from '@/screens/auth/login/login'
import Register from '@/screens/auth/register/register'
import Welcome from '@/screens/auth/welcome/welcome'
import * as Header from '@/ui/header/header'
import type { IRouteType } from './types'

export const authRoutes: IRouteType[] = [
	{
		name: 'Welcome',
		component: Welcome,
		options: {
			headerShown: false
		}
	},
	{
		name: 'Login',
		component: Login,
		options: {
			headerShown: true,
			header: ({ navigation }) => (
				<Header.Head>
					<Header.BackWithTitle title='Login in with email' />
					<Header.Button
						variant='foreground'
						onPress={() => navigation.navigate('Register')}
					>
						Sign up
					</Header.Button>
				</Header.Head>
			)
		}
	},
	{
		name: 'Register',
		component: Register,
		options: {
			headerShown: true,
			header: ({ navigation }) => (
				<Header.Head>
					<Header.BackWithTitle title='Create an account' />
					<Header.Button
						variant='foreground'
						onPress={() => navigation.navigate('Login')}
					>
						Sign in
					</Header.Button>
				</Header.Head>
			)
		}
	}
]
