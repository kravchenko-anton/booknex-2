import Login from '@/screens/auth/login/login'
import Register from '@/screens/auth/register/register'
import SelectGenres from '@/screens/auth/select-genres/select-genres'
import Welcome from '@/screens/auth/welcome/welcome'
import * as Header from '@/shared/ui/header/header'
import type { IRoute } from './types'

export const authRoutes: IRoute[] = [
	{
		name: 'Welcome',
		component: Welcome
	},
	{
		name: 'Login',
		component: Login,
		options: {
			headerShown: true,
			header: () => (
				<Header.Head>
					<Header.BackWithTitle title='Sign in' />
				</Header.Head>
			)
		}
	},
	{
		name: 'Registration',
		component: Register,
		options: {
			headerShown: true,
			header: () => (
				<Header.Head>
					<Header.BackWithTitle title='Sign up' />
				</Header.Head>
			)
		}
	},
	{
		name: 'SelectGenres',
		component: SelectGenres,
		options: {
			headerShown: true,
			header: () => (
				<Header.Head>
					<Header.BackWithTitle title='Select genres' />
				</Header.Head>
			)
		}
	}
]
