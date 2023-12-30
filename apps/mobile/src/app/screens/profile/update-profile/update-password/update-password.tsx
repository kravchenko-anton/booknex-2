import { useUpdatePassword } from '@/screens/profile/update-profile/update-password/useUpdatePassword'
import type { UpdatePasswordSchemaType } from '@/screens/profile/update-profile/update-password/validation'
import { UpdatePasswordSchema } from '@/screens/profile/update-profile/update-password/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Button, Field } from 'ui/components'

const UpdatePassword = () => {
	const { control, handleSubmit } = useForm<UpdatePasswordSchemaType>({
		resolver: zodResolver(UpdatePasswordSchema)
	})
	const { onSubmit } = useUpdatePassword()
	return (
		<View className='bg-dust mb-4 mt-4 rounded-md'>
			<Field
				control={control}
				name='oldPassword'
				secureTextEntry={true}
				placeholder='Old password'
			/>
			<Field
				control={control}
				name='password'
				secureTextEntry={true}
				placeholder='New password'
			/>

			<Button
				className='mt-2'
				onPress={handleSubmit(onSubmit)}
				text='Save'
				variant='primary'
				size='md'
			/>
		</View>
	)
}

export default UpdatePassword
