import { userServices } from '@/shared/api/services/user/user-service'
import { Loader, ScrollLayout, Title } from '@/shared/ui'
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
