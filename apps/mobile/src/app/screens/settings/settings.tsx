import { ScrollLayout } from '@/components'
import { useAction, useTypedNavigation } from '@/hooks'
import { errorToast } from '@/utils/toast'
import { Bug, Logout, MessageCircleQuestion } from 'icons'
import * as List from './settings-list'
//TODO: после обновления проложения добавить тут больше разнообразия и пофиксить консоль логи
const Settings = () => {
	const { navigate } = useTypedNavigation()
	const { logout } = useAction()
	return (
		<ScrollLayout className='px-2'>
			<List.Category title='Support' className='mt-4'>
				<List.Item
					bordered
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
					title='Sign out'
					icon={Logout}
					onPress={() =>
						navigate('Alert', {
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
