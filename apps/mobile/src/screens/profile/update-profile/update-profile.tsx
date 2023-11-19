import Header from '@/components/header/header'
import ScrollLayout from '@/components/layout/scroll-layout'
import BigLoader from '@/components/ui/loader/big-loader'
import UpdateBio from '@/screens/profile/update-profile/update-bio/update-bio'
import UpdatePassword from '@/screens/profile/update-profile/update-password/update-password'
import UpdatePicture from '@/screens/profile/update-profile/update-picture/update-picture'
import { userServices } from '@/services/user-service'
import { useQuery } from '@tanstack/react-query'

const UpdateProfile = () => {
	const { data: profile } = useQuery(['user-profile'], () =>
		userServices.getProfile()
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
