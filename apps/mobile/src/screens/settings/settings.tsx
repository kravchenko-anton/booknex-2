import { useAuth, useTypedNavigation } from '@/hooks'
import { useOTAVersion } from '@/screens/settings/getAppVersion'
import { Title } from '@/ui'
import { mailLink } from 'global/utils'
import { Linking, View } from 'react-native'
import * as List from './settings-list'

const Settings = () => {
	const { navigate } = useTypedNavigation()
	const { user } = useAuth()
	const { appVersion } = useOTAVersion()
	return (
		<View className='h-full'>
			<View className='pt-4'>
				<List.Item
					title='Contact support'
					onPress={() => Linking.openURL(mailLink)}
				/>
				<List.Item
					title='Privacy policy'
					onPress={() =>
						Linking.openURL('https://booknex.up.railway.app/privacy-policy')
					}
				/>
				<List.Item
					title='Terms of service'
					onPress={() =>
						Linking.openURL('https://booknex.up.railway.app/terms-of-service')
					}
				/>
				<List.Item
					bordered
					title='Community chat'
					onPress={() => Linking.openURL('https://t.me/boknex')}
				/>

				<List.Item
					description={user?.email}
					title={`Sign out`}
					onPress={() => navigate('Logout')}
				/>
			</View>
			<Title size='sm' className='mb-4 mt-auto text-center'>
				{`Version: ${appVersion}`}
			</Title>
		</View>
	)
}
export default Settings
