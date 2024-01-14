import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { Loader, Title } from '@/components/ui'
import { useTypedNavigation } from '@/hooks'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { Settings } from 'icons'

const Profile = () => {
	const { data: profile } = useQuery(['user-profile'], () =>
		userServices.profile()
	)
	const { navigate } = useTypedNavigation()
	if (!profile) return <Loader />
	// TODO: делать тут обычный layout и повыноить обновление профиля в настройки
	return (
		<Layout.Wrapper
			className='px-2'
			header={
				<Layout.Header>
					<Layout.Logo className='pl-2' />
					<Layout.Icon
						icon={Settings}
						className='px-2'
						onPress={() => navigate('Settings')}
					/>
				</Layout.Header>
			}
		>
			<Title
				className='mt-40 items-center justify-center'
				weight='bold'
				center
				size={25}
				numberOfLines={6}
			>
				This section is not finished, later here will be your achievements and
				statistic 😔
			</Title>
		</Layout.Wrapper>
	)
}

export default Profile
