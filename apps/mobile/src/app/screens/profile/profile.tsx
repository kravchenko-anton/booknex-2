import { ScrollLayout } from '@/components'
import * as Header from '@/components/header/header'
import { useTypedNavigation } from '@/hooks'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { Pen, Settings } from 'icons'
import { View } from 'react-native'
import { AnimatedIcon, Image, Loader, Title } from 'ui/components'

const Profile = () => {
	const { data: profile } = useQuery(['user-profile'], () =>
		userServices.profile()
	)
	const { navigate } = useTypedNavigation()
	if (!profile) return <Loader />
	// TODO: делать тут обычный layout и повыноить обновление профиля в настройки
	return (
		<ScrollLayout className='px-4'>
			<Header.Head>
				<Header.Icon
					icon={Settings}
					onPress={() => {
						navigate('Settings')
					}}
				/>
			</Header.Head>
			<View className='items-center self-center'>
				<View className='relative'>
					<Image height={140} width={140} url={profile.picture} />
					<AnimatedIcon
						icon={Pen}
						onPress={() => {
							navigate('UpdateProfile')
						}}
						size='md'
						variant='vibrant'
						className='absolute right-[-20px] top-[-20px]'
					/>
				</View>

				<Title className='mt-2 text-center' size={36} weight='bold'>
					{profile.name}
				</Title>
			</View>
		</ScrollLayout>
	)
}

export default Profile
