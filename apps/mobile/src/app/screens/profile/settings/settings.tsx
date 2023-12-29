import { HeaderScrollLayout } from '@/components'
import * as Header from '@/components/header/header'
import { useAction, useTypedNavigation } from '@/hooks'
import { Bug, MessageCircleQuestion } from 'icons'
import Toast from 'react-native-toast-message'
import * as List from './settings-list'
//TODO: после обновления проложения добавить тут больше разнообразия и пофиксить консоль логи
const Settings = () => {
	const { navigate } = useTypedNavigation()
	const { showAlert } = useAction()
	const { logout } = useAction()
	return (
		<HeaderScrollLayout title='Settings' transientValue={80} className='px-2'>
			<Header.Head>
				<Header.Text text='Settings' />
			</Header.Head>

			<List.Category title='Support' className='mt-4'>
				<List.Item
					title='Give feedback'
					icon={MessageCircleQuestion}
					onPress={() =>
						Toast.show({
							type: 'success',
							text1: 'Now it not working, check late'
						})
					}
				/>
				<List.Item
					title='Report a bug'
					icon={Bug}
					onPress={() =>
						Toast.show({
							type: 'success',
							text1: 'Now it not working, check late'
						})
					}
				/>
			</List.Category>
			<List.Category title='Account'>
				<List.Item
					title='Update Account'
					icon={MessageCircleQuestion}
					onPress={() => navigate('UpdateProfile')}
				/>
				<List.Item
					title='Sign out'
					icon={Bug}
					onPress={() =>
						showAlert({
							title: 'Are you sure?',
							description: 'You want to logout from your account?',
							acceptText: 'Logout',
							type: 'warning',
							onAccept: () => logout()
						})
					}
				/>
			</List.Category>
		</HeaderScrollLayout>
	)
}
export default Settings
