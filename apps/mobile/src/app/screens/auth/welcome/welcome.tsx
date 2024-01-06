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
		<Layout className='flex h-full justify-end'>
			<View className='h-1/2 justify-between'>
				<View>
					<WelcomeIllustration
						width={250}
						height={250}
						className='mx-auto w-full'
					/>
					<Title numberOfLines={2} center size={32} weight='bold'>
						Welcome to Booker
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
						className='mt-2'
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
