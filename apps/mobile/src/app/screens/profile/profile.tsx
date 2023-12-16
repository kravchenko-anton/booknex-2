import { AnimatedIcon, BigLoader, Header, Image, ScrollLayout, Title } from '@/components'
import { useTypedNavigation } from '@/hooks'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { Pen, Settings } from 'icons'
import { View } from 'react-native'
import { Color } from 'ui/colors'

const Profile = () => {
	const { data: profile } = useQuery(['user-profile'], () =>
		userServices.profile()
	)
	const { navigate } = useTypedNavigation()
	if (!profile) return <BigLoader />
	// TODO: делать тут обычный layout и повыноить обновление профиля в настройки
	return (
		<ScrollLayout className="px-4">
			<Header
				right={{
					icon: {
						onPress: () => {
							navigate('Settings')
						},
						icon: Settings
					}
				}}
			/>
			<View className="items-center self-center">
				<View className="relative">
					<Image height={140} width={140} url={profile.picture} />
					<AnimatedIcon
						icon={Pen}
						color={Color.white}
						backgroundColor={Color.primary}
						onPress={() => {
							navigate('UpdateProfile')
						}}
						size="medium"
						variant="filled"
						className="absolute right-[-20px] top-[-20px]"
					/>
				</View>
				
				<Title className="mt-2 text-center" size={36} weight="bold">
					{profile.name}
				</Title>
			</View>
		</ScrollLayout>
	)
}

export default Profile
