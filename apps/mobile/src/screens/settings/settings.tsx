import { useAuth, useTypedNavigation } from '@/hooks'
import { Linking, View } from 'react-native'
import * as List from './settings-list'

const Settings = () => {
	const { navigate } = useTypedNavigation()
	const { user } = useAuth()
	// const version = useAppVersion()
	return (
		<View className='h-full'>
			<View className='pt-4'>
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
			</View>
			{/* <Title size='sm' className='mb-4 mt-auto text-center'> */}
			{/* 	{`Version: ${version}`} */}
			{/* </Title> */}
		</View>
	)
}
export default Settings
