import Header from '@/components/header/header'
import ScrollLayout from '@/components/layout/scroll-layout'
import UpdateBio from '@/screens/profile/update-profile/update-bio/update-bio'
import UpdatePassword from '@/screens/profile/update-profile/update-password/update-password'
import UpdatePicture from '@/screens/profile/update-profile/update-picture/update-picture'
import { userServices } from '@/services/user/user-service'
import { useQuery } from '@tanstack/react-query'
import { BigLoader } from 'ui/components'

const UpdateProfile = () => {
	const { data: profile } = useQuery(['user-profile'], () =>
		userServices.profile()
	)
	if (!profile) return <BigLoader />
	return (
		<ScrollLayout className='p-2'>
			<Header
				right={{
					title: 'Update Profile'
				}}
			/>
			<UpdatePicture picture={profile.picture} />
			<UpdateBio defaultName={profile.name} defaultEmail={profile.email} />
			<UpdatePassword />
		</ScrollLayout>
	)
}

export default UpdateProfile
