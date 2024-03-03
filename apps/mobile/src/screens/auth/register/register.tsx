import { useAction } from '@/hooks'
import { useAuthorize } from '@/screens/auth/useAuthorize'

import { Button, Field, ScrollLayout } from '@/ui'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { AuthDto } from 'global/api-dto/auth/auth.dto'
import { Mail, Password } from 'icons'
import { useForm, type SubmitHandler } from 'react-hook-form'

const Register = () => {
	const { isLoading } = useAuthorize()
	const { mailRegister } = useAction()
	const { control, handleSubmit } = useForm<AuthDto>({
		mode: 'onSubmit',
		resolver: classValidatorResolver(AuthDto)
	})

	const onSubmit: SubmitHandler<AuthDto> = ({ email, password }) => {
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
