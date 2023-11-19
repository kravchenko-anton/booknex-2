import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import type {
	BioSectionProperties,
	UserUpdateBioTypes
} from '@/screens/profile/update-profile/update-bio/update-bio-types'
import { useUpdateBio } from '@/screens/profile/update-profile/update-bio/useUpdateBio'
import { emailRules, nameRules } from '@/utils/input-validation'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const UpdateBio: FC<BioSectionProperties> = ({ defaultEmail, defaultName }) => {
	const { control, handleSubmit } = useForm<UserUpdateBioTypes>()
	const { onSubmit } = useUpdateBio()
	return (
		<View className='mt-8 rounded-2xl bg-dust p-4'>
			<Title weight={'bold'} className='mb-2' size={24}>
				Basic information
			</Title>
			<Field
				control={control}
				defaultValue={defaultName}
				rules={nameRules}
				name={'name'}
				placeholder={'Name'}
			/>
			<Field
				defaultValue={defaultEmail}
				control={control}
				rules={emailRules}
				name={'email'}
				placeholder={'Email'}
			/>
			<Button
				onPress={handleSubmit(onSubmit)}
				className='mt-2'
				text={'Save'}
				variant={'primary'}
				size={'medium'}
			/>
		</View>
	)
}

export default UpdateBio
