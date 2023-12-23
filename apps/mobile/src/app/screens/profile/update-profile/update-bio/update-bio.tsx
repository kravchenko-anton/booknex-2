import type { BioSectionProperties } from '@/screens/profile/update-profile/update-bio/types'
import { useUpdateBio } from '@/screens/profile/update-profile/update-bio/useUpdateBio'
import type { UpdateBioSchemaType } from '@/screens/profile/update-profile/update-bio/validation'
import { UpdateBioSchema } from '@/screens/profile/update-profile/update-bio/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Button, Field, Title } from 'ui/components'

const UpdateBio: FC<BioSectionProperties> = ({ defaultEmail, defaultName }) => {
	const { control, handleSubmit } = useForm<UpdateBioSchemaType>({
		mode: 'onSubmit',
		resolver: zodResolver(UpdateBioSchema)
	})
	const { onSubmit } = useUpdateBio()
	return (
		<View className='bg-dust mt-8 rounded-md p-4'>
			<Title weight='bold' className='mb-2' size={24}>
				Basic information
			</Title>
			<Field
				control={control}
				defaultValue={defaultName}
				name='name'
				placeholder='Name'
			/>
			<Field
				defaultValue={defaultEmail}
				control={control}
				name='email'
				placeholder='Email'
			/>
			<Button
				onPress={handleSubmit(onSubmit)}
				className='mt-2'
				text='Save'
				variant='primary'
				size='md'
			/>
		</View>
	)
}

export default UpdateBio
