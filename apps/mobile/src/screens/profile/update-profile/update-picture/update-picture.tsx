import Button from '@/components/ui/button/button'
import Image from '@/components/ui/image/image'
import type { UpdatePictureProperties } from '@/screens/profile/update-profile/update-picture/update-picture-types'
import { useUploadUserPicture } from '@/screens/profile/update-profile/update-picture/useUploadPicture'
import type { FC } from 'react'
import { View } from 'react-native'

const UpdatePicture: FC<UpdatePictureProperties> = ({ picture }) => {
	const { updatePicture } = useUploadUserPicture(picture)
	return (
		<View className='mt-8 w-full items-center'>
			<Image height={140} width={140} url={picture} />

			<View className=' w-full px-4 pb-2'>
				<Button
					className='mt-4 w-full'
					variant={'primary'}
					onPress={() => updatePicture()}
					size={'medium'}
					text={'Change photo'}
				/>
			</View>
		</View>
	)
}

export default UpdatePicture
