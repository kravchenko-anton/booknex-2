import { userServices } from '@/api/services/user/user-service'
import { Loader, ScrollLayout, Title } from '@/ui'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
	const { data: profile } = useQuery({
		queryKey: ['user-profile'],
		queryFn: () => userServices.profile()
	})
	if (!profile) return <Loader />
	return (
		<ScrollLayout className='px-2'>
			<Title
				center
				className='mt-40 items-center justify-center'
				weight='bold'
				size={'xxl'}
				numberOfLines={6}
			>
				This section is not finished, later here will be your achievements and
				statistic 😔
			</Title>
		</ScrollLayout>
	)
}

export default Profile
