import { ScrollLayout } from '@/components'
import * as Header from '@/components/header/header'
import { useTypedNavigation } from '@/hooks'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { Settings } from 'icons'
import { Loader, Title } from 'ui/components'

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
		</ScrollLayout>
	)
}

export default Profile
