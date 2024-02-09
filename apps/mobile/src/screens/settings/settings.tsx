import { useAction } from '@/hooks'
import { ScrollLayout } from '@/ui'
import Alert from '@/ui/alert/alert'
import { errorToast } from '@/utils/toast'
import { Bug, Logout, MessageCircleQuestion } from 'icons'
import { useState } from 'react'
import * as List from './settings-list'
//TODO: после обновления проложения добавить тут больше разнообразия и пофиксить консоль логи
const Settings = () => {
	const { logout } = useAction()
	const [logoutModal, setLogoutModal] = useState(false)
	return (
		<>
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
						onPress={() => setLogoutModal(true)}
					/>
				</List.Category>
			</ScrollLayout>
			<Alert
				setVisible={setLogoutModal}
				icon={Logout}
				description='Are you sure you want to logout?'
				acceptText='Logout'
				type='danger'
				isVisible={logoutModal}
				onAccept={logout}
			/>
		</>
	)
}
export default Settings
