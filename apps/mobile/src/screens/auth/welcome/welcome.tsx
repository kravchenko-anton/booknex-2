import { useTypedNavigation } from '@/hooks'
import { Icon, Layout, Title } from '@/ui'
import {
	GoogleSignin,
	GoogleSigninButton,
	statusCodes
} from '@react-native-google-signin/google-signin'
import { Color } from 'global/colors'
import { Welcome as WelcomeIllustration } from 'global/illustrations'
import { Mail } from 'icons'
import { useEffect, type FC } from 'react'
import { View } from 'react-native'

const Welcome: FC = () => {
	//TODO: сделать нормальный welcome скрин а не такую простую залупу
	const { navigate } = useTypedNavigation()
	useEffect(() => {
		GoogleSignin.configure({
			webClientId:
				'390949311214-20tt61lvbofiikucs1gq98sfqhfkb6g7.apps.googleusercontent.com',
			offlineAccess: true,
			forceCodeForRefreshToken: true
		})
	}, [])
	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices()
			const userInfo = await GoogleSignin.signIn()

			console.log(userInfo)
		} catch (error: any) {
			switch (error.code) {
				case statusCodes.SIGN_IN_CANCELLED: {
					console.log('User cancelled the login flow')

					break
				}
				case statusCodes.IN_PROGRESS: {
					console.log('Signing in')

					break
				}
				case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: {
					console.log('Play services not available')

					break
				}
				default: {
					console.log('Some other error happened')
					console.log(error.message)
					console.log(error.code)
				}
			}
		}
	}

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
						<GoogleSigninButton
							style={{ width: 192, height: 48, marginTop: 30 }}
							size={GoogleSigninButton.Size.Wide}
							color={GoogleSigninButton.Color.Light}
							onPress={signIn}
						/>
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
