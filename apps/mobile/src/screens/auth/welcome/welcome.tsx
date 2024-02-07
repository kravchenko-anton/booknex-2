import { useTypedNavigation } from '@/hooks'
import { Button, Icon, Layout, Title } from '@/ui'
import { Color } from 'global/colors'
import { Welcome as WelcomeIllustration } from 'global/illustrations'
import { Google, Mail } from 'icons'
import type { FC } from 'react'
import { View } from 'react-native'

const Welcome: FC = () => {
	//TODO: сделать нормальный welcome скрин а не такую простую залупу
	const { navigate } = useTypedNavigation()
	// useEffect(() => {
	// 	GoogleSignin.configure({
	// 		scopes: ['https://www.googleapis.com/auth/drive.readonly'],
	// 		webClientId:
	// 			'390949311214-hqfqvic7p47pt3elpne00es58k99nonh.apps.googleusercontent.com',
	// 		offlineAccess: true
	// 	})
	// }, [])
	// const signIn = async () => {
	// 	try {
	// 		await GoogleSignin.hasPlayServices()
	// 		const userInfo = await GoogleSignin.signIn()
	// 		console.log(userInfo)
	// 	} catch (error) {
	// 		console.log(JSON.stringify(error))
	// 	}
	// }

	return (
		<Layout className='justify-end'>
			<View className='h-4/5 justify-between'>
				<View>
					<WelcomeIllustration
						width={230}
						height={230}
						className='ml-auto w-full p-0'
					/>
					<Title
						center
						numberOfLines={2}
						weight={'bold'}
						size={30}
						className='text-left'
					>
						Dive into the world of unique{' '}
						<Title weight={'bold'} size={30} color={Color.primary}>
							stories
						</Title>
					</Title>
					<Title
						center
						size={18}
						weight='light'
						className='text-left'
						color={Color.gray}
					>
						Enter your credentials to continue
					</Title>
				</View>

				<View className='mb-4 w-full flex-row items-center justify-between gap-0'>
					<View>
						<Button icon={Google} size='lg' variant='foreground'>
							Sign in with Google
						</Button>
					</View>

					<Icon
						size='lg'
						className=''
						variant='foreground'
						icon={Mail}
						onPress={() => navigate('Register')}
					/>
				</View>
			</View>
		</Layout>
	)
}

export default Welcome
