import { Layout } from '@/components'
import { useTypedNavigation } from '@/hooks'
import type { FC } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Button, Title } from 'ui/components'

const Welcome: FC = () => {
	const { navigate } = useTypedNavigation()
	return (
		<Layout className='relative justify-center p-4'>
			<View>
				<View className='w-full items-center rounded-md bg-white p-4'>
					<Title
						size={36}
						color={Color.secondary}
						className='mb-2'
						weight='bold'
					>
						Booknex
					</Title>
					<Title
						size={16}
						color={Color.gray}
						numberOfLines={10}
						className='w-full  text-center'
						weight='light'
					>
						Booknex is your go-to app for reading and discovering books. With a
						user-friendly interface, it offers an extensive library and
						personalized book recommendations. Whether you're a seasoned reader
						or just looking for your next great read, Booknex simplifies the
						book discovery process and lets you dive right into your favorite
						stories.
					</Title>

					<Button
						onPress={() => {
							navigate('CheckEmail')
						}}
						size='lg'
						text='Get Started'
						variant='primary'
						className='mt-6'
						width='100%'
					/>
				</View>
			</View>
		</Layout>
	)
}

export default Welcome
