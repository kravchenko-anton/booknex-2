import { Layout } from '@/components'
import { useTypedNavigation } from '@/hooks'
import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Button, Title } from 'ui/components'

const Welcome: FC = () => {
	//TODO: сделать нормальный welcome скрин а не такую простую залупу
	const { navigate } = useTypedNavigation()
	return (
		<Layout className=' justify-between p-4'>
			<View>
				<Title size={40} className='mb-2' weight='bold'>
					Booker
				</Title>
				<Title size={24} color={Color.gray} weight='regular'>
					Find your favorite books
				</Title>
			</View>

			<View className='w-full items-center'>
				<Button
					size='md'
					text='Sign up'
					variant='secondary'
					width='100%'
					onPress={() => navigate('SelectGenres')}
				/>

				<Button
					onPress={() => navigate('Login')}
					size='md'
					className='mt-2'
					text='Sign in'
					variant='foreground'
					width='100%'
				/>
			</View>
		</Layout>
	)
}

export default Welcome
