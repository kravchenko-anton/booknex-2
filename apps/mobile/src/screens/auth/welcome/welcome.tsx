import { useAuthStore } from '@/screens/auth/store/auth-store'
import { useAuthorize } from '@/screens/auth/useAuthorize'
import { Button, ScrollLayout, Title } from '@/ui'
import { errorToast } from '@/utils/toast'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Color } from 'global/colors'
import { appName } from 'global/utils'
import { Book, Google, Mail } from 'icons'
import { Login as LoginIllustration } from 'illustrations'
import { useLayoutEffect, type FC } from 'react'
import { Linking, View } from 'react-native'

const Welcome: FC = () => {
	const { googleLogin } = useAuthStore(state => ({
		googleLogin: state.googleLogin
	}))
	const {
		isLoading: authLoading,
		onCreateAccount,
		onContinueWithMail
	} = useAuthorize()

	useLayoutEffect(() => {
		GoogleSignin.configure({
			webClientId:
				//TODO: обернуть в env
				'390949311214-hqfqvic7p47pt3elpne00es58k99nonh.apps.googleusercontent.com'
		})
	}, [])

	const signIn = async () => {
		try {
			await GoogleSignin.hasPlayServices()
			const userInfo = await GoogleSignin.signIn().catch(error =>
				console.log(error)
			)
			if (!userInfo.idToken) return errorToast('Something went wrong')
			googleLogin({
				socialId: userInfo.idToken
			})
		} catch {
			errorToast('Something went wrong')
		}
	}

	return (
		<ScrollLayout>
			<View className='mb-4 mt-[20%]'>
				<LoginIllustration
					width={200}
					height={200}
					className='mx-auto w-full p-0'
				/>
			</View>
			<View className='mx-4'>
				<Title
					center
					numberOfLines={2}
					size='xxl'
					color={Color.white}
					weight='medium'
					className='mb-6'>
					Welcome to
					<Title
						numberOfLines={2}
						size='xxl'
						color={Color.primary}
						weight='bold'>
						{` ${appName}`}
					</Title>
					,{'\n'}the best place to read books
				</Title>
				<Button
					size='md'
					isLoading={authLoading === 'google'}
					className='mb-3 py-2'
					icon={Google}
					variant='muted'
					onPress={signIn}>
					Continue with Google
				</Button>
				<Button
					size='md'
					variant='muted'
					isLoading={authLoading === 'mail-login'}
					className='mb-2 py-2'
					icon={Mail}
					onPress={onContinueWithMail}>
					Continue with Email
				</Button>
				<View className='border-bordered flex-row items-center justify-center border-b-2 border-b-2'>
					<Title
						center
						weight='bold'
						size='md'
						className='bg-background overflow-50 -mb-[11px] mt-2 w-[50px]'>
						Or
					</Title>
				</View>
				<View className='mt-4'>
					<Button
						size='md'
						className='mb-2 py-2'
						variant='foreground'
						icon={Book}
						onPress={() => onCreateAccount()}>
						Create account
					</Button>
				</View>
				<Title className='mt-2' color={Color.gray} numberOfLines={4}>
					By continuing, you agree to our{' '}
					<Title
						weight='bold'
						onPress={() =>
							Linking.openURL('https://booknex.up.railway.app/terms-of-service')
						}>
						Terms of Service
					</Title>{' '}
					and{' '}
					<Title
						weight='bold'
						onPress={() =>
							Linking.openURL('https://booknex.up.railway.app/privacy-policy')
						}>
						Privacy Policy
					</Title>
				</Title>
			</View>
		</ScrollLayout>
	)
}

export default Welcome
