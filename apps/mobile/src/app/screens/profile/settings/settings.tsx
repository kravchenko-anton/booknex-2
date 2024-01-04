import { ScrollLayout } from '@/components'
import * as Header from '@/components/header/header'
import { useAction, useTypedNavigation } from '@/hooks'
import { AlertContext } from '@/providers/alert-provider'
import { errorToast } from '@/utils/toast'
import { Bug, EyeOff, Logout, MessageCircleQuestion } from 'icons'
import { useContext } from 'react'
import * as List from './settings-list'
//TODO: после обновления проложения добавить тут больше разнообразия и пофиксить консоль логи
const Settings = () => {
	const { navigate } = useTypedNavigation()
	const { showAlert } = useContext(AlertContext)
	const { logout } = useAction()
	return (
		<ScrollLayout className='px-2'>
			<Header.Head>
				<Header.Title text='Settings' />
			</Header.Head>

			<List.Category title='Support' className='mt-4'>
				<List.Item
					title='Give feedback'
					icon={MessageCircleQuestion}
					onPress={() => errorToast('Now it not working, check late')}
				/>
				<List.Item
					title='Report a bug'
					icon={Bug}
					onPress={() => errorToast('Now it not working, check late')}
				/>
			</List.Category>
			<List.Category title='Account'>
				<List.Item
					title='Update Password'
					icon={EyeOff}
					onPress={() => navigate('UpdateProfile')}
				/>
				<List.Item
					title='Sign out'
					icon={Logout}
					onPress={() =>
						showAlert({
							icon: Logout,
							type: 'danger',
							description: 'You want to logout from your account?',
							acceptText: 'Logout',
							onAccept: () => logout()
						})
					}
				/>
			</List.Category>
		</ScrollLayout>
	)
}
export default Settings
