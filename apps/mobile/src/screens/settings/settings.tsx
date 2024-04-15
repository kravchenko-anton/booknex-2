import { useAuth, useTypedNavigation } from '@/hooks'
import { ScrollLayout } from '@/ui'
import { Linking } from 'react-native'
import * as List from './settings-list'

const Settings = () => {
	const { navigate } = useTypedNavigation()
	const { user } = useAuth()
	return (
		<ScrollLayout className='pt-4'>
			<List.Item
				title='Contact support'
				onPress={() => Linking.openURL('mailto:booknex.company@gmail.com')}
			/>
			<List.Item
				title='Privacy policy'
				onPress={() =>
					Linking.openURL('https://booknex.up.railway.app/privacy-policy')
				}
			/>
			<List.Item
				bordered
				title='Terms of service'
				onPress={() =>
					Linking.openURL('https://booknex.up.railway.app/terms-of-service')
				}
			/>

			<List.Item
				description={user?.email}
				title={`Sign out`}
				onPress={() => navigate('Logout')}
			/>
		</ScrollLayout>
	)
}
export default Settings
