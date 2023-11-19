import Header from '@/components/header/header'
import ScrollLayout from '@/components/layout/scroll-layout'
import PressableContainer from '@/components/pressable-container/pressable-container'
import FlatList from '@/components/ui/flatlist/flatlist'
import AnimatedIcon from '@/components/ui/icon/animated-icon'
import Icon from '@/components/ui/icon/icon'
import Image from '@/components/ui/image/image'
import BigLoader from '@/components/ui/loader/big-loader'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { userServices } from '@/services/user-service'
import { Color } from '@/utils/color'
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
						name: 'gear'
					}
				}}
			/>
			<View className='items-center self-center'>
				<View className='relative'>
					<Image height={140} width={140} url={profile.picture} />
					<AnimatedIcon
						name={'pencil'}
						backgroundColor={Color.gray}
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
					<PressableContainer className='flex-row items-center justify-between rounded-xl bg-dust p-4'>
						<View>
							<Title weight={'bold'} size={24}>
								{item.count}
							</Title>
							<Title weight={'light'} size={18} color={Color.gray}>
								{item.name}
							</Title>
						</View>
						<Icon
							name={item.icon}
							size={'large'}
							color={Color.secondary}
							variant={'ghost'}
						/>
					</PressableContainer>
				)}
			/>
		</ScrollLayout>
	)
}

export default Profile
