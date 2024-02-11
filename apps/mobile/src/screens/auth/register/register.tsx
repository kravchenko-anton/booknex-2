import { useAction } from '@/hooks'
import { useAuthorize } from '@/screens/auth/useAuthorize'
import {
	authValidationSchema,
	type AuthValidationSchemaType
} from '@/screens/auth/validation'
import { Button, Field, ScrollLayout } from '@/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Password } from 'icons'
import { useForm, type SubmitHandler } from 'react-hook-form'

const Register = () => {
	const { isLoading } = useAuthorize()
	const { mailRegister } = useAction()
	const { control, handleSubmit } = useForm<AuthValidationSchemaType>({
		resolver: zodResolver(authValidationSchema)
	})
	const onSubmit: SubmitHandler<AuthValidationSchemaType> = ({
		email,
		password
	}) => {
		mailRegister({
			password,
			email
		})
	}
	return (
		<ScrollLayout className='px-2 py-4'>
			<Field
				icon={Mail}
				control={control}
				name='email'
				keyboardType='email-address'
				placeholder='Email'
			/>
			<Field
				secureTextEntry
				icon={Password}
				control={control}
				name='password'
				className='my-1.5'
				placeholder='Password'
			/>
			<Button
				isLoading={isLoading}
				size='lg'
				className='mb-2 mt-1'
				variant='primary'
				onPress={handleSubmit(onSubmit)}
			>
				Sign up
			</Button>
		</ScrollLayout>
	)
}

export default Register
