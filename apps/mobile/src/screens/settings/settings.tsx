import { ScrollLayout } from '@/ui'
import { errorToast } from '@/utils/toast'
import { Bug, Logout, MessageCircleQuestion } from 'icons'
import * as List from './settings-list'
//TODO: после обновления проложения добавить тут больше разнообразия и пофиксить консоль логи
const Settings = () => (
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
				// onPress={() => navigate('LogoutModal')}
			/>
		</List.Category>
	</ScrollLayout>
)
export default Settings
