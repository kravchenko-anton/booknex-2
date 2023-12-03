import {
	AnimatedIcon,
	BigLoader,
	FlatList,
	Header,
	Image,
	PressableContainer,
	ScrollLayout,
	Title
} from '@/components'
import { useTypedNavigation } from '@/hooks'
import { Pen, Settings } from '@/icons'
import { userServices } from '@/services/user-service'
import { Color } from '@/ui/colors'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'

const Profile = () => {
	const { data: profile } = useQuery(['user-profile'], () =>
		userServices.getProfile()
	)
	const { navigate } = useTypedNavigation()
	if (!profile) return <BigLoader />
	// TODO: делать тут обычный layout и повыноить обновление профиля в настройки
	return (
		<ScrollLayout className='px-4'>
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
			<View className='items-center self-center'>
				<View className='relative'>
					<Image height={140} width={140} url={profile.picture} />
					<AnimatedIcon
						icon={Pen}
						color={Color.white}
						backgroundColor={Color.primary}
						onPress={() => {
							navigate('UpdateProfile')
						}}
						size={'medium'}
						variant={'filled'}
						className='absolute right-[-20px] top-[-20px]'
					/>
				</View>

				<Title className='mt-2 text-center' size={36} weight={'bold'}>
					{profile.name}
				</Title>
			</View>
			<Title className='mt-8' weight={'semiBold'} size={32}>
				Statistics
			</Title>
			<FlatList
				scrollEnabled={false}
				className='my-2'
				data={profile.statistics}
				renderItem={({ item }) => (
					<PressableContainer className='bg-dust flex-row items-center justify-between rounded-xl p-4'>
						<View>
							<Title weight={'bold'} size={24}>
								{item.count}
							</Title>
							<Title weight={'light'} size={18} color={Color.gray}>
								{item.name}
							</Title>
						</View>
					</PressableContainer>
				)}
			/>
		</ScrollLayout>
	)
}

export default Profile
