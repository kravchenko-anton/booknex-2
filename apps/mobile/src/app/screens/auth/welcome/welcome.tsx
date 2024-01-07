import { Layout } from '@/components'
import { useTypedNavigation } from '@/hooks'
import { Welcome as WelcomeIllustration } from 'global/illustrations'
import type { FC } from 'react'
import { View } from 'react-native'
import { Button, Title } from 'ui/components'

const Welcome: FC = () => {
	//TODO: сделать нормальный welcome скрин а не такую простую залупу
	const { navigate } = useTypedNavigation()
	return (
		<Layout className='justify-end'>
			<View className='h-4/5 justify-between'>
				<View>
					<WelcomeIllustration
						width={300}
						height={300}
						className='mx-auto w-full p-0'
					/>
					<Title numberOfLines={2} center size={26} weight='bold'>
						Welcome to Booker, {'\n'}
						best place to read books
					</Title>
				</View>

				<View className='w-full items-center'>
					<Button
						size='md'
						variant='secondary'
						width='100%'
						onPress={() => navigate('SelectGenres')}
					>
						Sign up
					</Button>

					<Button
						onPress={() => navigate('Login')}
						size='md'
						className='mb-2 mt-2.5'
						variant='foreground'
						width='100%'
					>
						Sign in
					</Button>
				</View>
			</View>
		</Layout>
	)
}

export default Welcome
