import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { useAction } from '@/hooks'
import { AlertContext } from '@/providers/alert-provider'
import { errorToast } from '@/utils/toast'
import { Bug, Logout, MessageCircleQuestion } from 'icons'
import { useContext } from 'react'
import * as List from './settings-list'
//TODO: после обновления проложения добавить тут больше разнообразия и пофиксить консоль логи
const Settings = () => {
	const { showAlert } = useContext(AlertContext)
	const { logout } = useAction()
	return (
		<Layout.Wrapper
			className='px-2'
			header={
				<Layout.Header>
					<Layout.BackWithTitle title='Settings' />
				</Layout.Header>
			}
		>
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
		</Layout.Wrapper>
	)
}
export default Settings
