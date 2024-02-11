import { useTypedNavigation } from '@/hooks'
import { ScrollLayout } from '@/ui'
import { Bug, Logout, MessageCircleQuestion } from 'icons'
import { Linking } from 'react-native'
import * as List from './settings-list'
//TODO: после обновления проложения добавить тут больше разнообразия и пофиксить консоль логи
const Settings = () => {
	const { navigate } = useTypedNavigation()
	return (
		<ScrollLayout className='px-2'>
			<List.Category title='Support' className='mt-4'>
				<List.Item
					bordered
					title='Give feedback'
					icon={MessageCircleQuestion}
					onPress={() => Linking.openURL('mailto:booknex.company@gmail.com')}
				/>
				<List.Item
					title='Report a bug'
					icon={Bug}
					onPress={() => Linking.openURL('mailto:booknex.company@gmail.com')}
				/>
			</List.Category>
			<List.Category title='Account'>
				<List.Item
					title='Sign out'
					icon={Logout}
					onPress={() => navigate('Logout')}
				/>
			</List.Category>
		</ScrollLayout>
	)
}
export default Settings
