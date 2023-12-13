import { Button, Field, Title } from '@/components'
import { passwordRules } from '@/global/utils/input-validation'
import type { EditPasswordTypes } from '@/screens/profile/update-profile/update-password/update-password-types'
import { useUpdatePassword } from '@/screens/profile/update-profile/update-password/useUpdatePassword'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const UpdatePassword = () => {
	const { control, handleSubmit } = useForm<EditPasswordTypes>()
	const { onSubmit } = useUpdatePassword()
	return (
		<View className='bg-dust mb-4 mt-8 rounded-2xl p-4'>
			<Title weight='bold' className='mb-2' size={24}>
				Password
			</Title>
			<Field
				control={control}
				name='oldPassword'
				secureTextEntry={true}
				rules={passwordRules}
				placeholder='Old password'
			/>
			<Field
				control={control}
				name='password'
				secureTextEntry={true}
				rules={passwordRules}
				placeholder='New password'
			/>

			<Button
				className='mt-2'
				onPress={handleSubmit(onSubmit)}
				text='Save'
				variant='primary'
				size='medium'
			/>
		</View>
	)
}

export default UpdatePassword
