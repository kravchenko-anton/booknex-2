import * as Header from '@/components/header/header'
import ScrollLayout from '@/components/layout/scroll-layout'
import UpdatePassword from '@/screens/profile/update-profile/update-password/update-password'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { Loader } from 'ui/components'

const UpdateProfile = () => {
	const { data: profile } = useQuery(['user-profile'], () =>
		userServices.profile()
	)
	if (!profile) return <Loader />
	return (
		<ScrollLayout className='p-2'>
			<Header.Head>
				<Header.Title text='Update Password' />
			</Header.Head>
			<UpdatePassword />
		</ScrollLayout>
	)
}

export default UpdateProfile
