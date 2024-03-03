import { useAction } from '@/hooks'
import { useAuthorize } from '@/screens/auth/useAuthorize'
import { Button, Field, ScrollLayout } from '@/ui'
import { classValidatorResolver } from '@hookform/resolvers/class-validator'
import { AuthDto } from 'global/api-dto/auth/auth.dto'
import { Mail, Password } from 'icons'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

const Login = () => {
	const { mailLogin } = useAction()
	const { isLoading } = useAuthorize()
	const { control, handleSubmit } = useForm<AuthDto>({
		mode: 'onSubmit',
		resolver: classValidatorResolver(AuthDto)
	})

	const onSubmit: SubmitHandler<AuthDto> = ({ password, email }) =>
		mailLogin({ password, email })

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
				placeholder='Password'
			/>
			<Button
				size='lg'
				isLoading={isLoading}
				variant='primary'
				className='mb-4 mt-2'
				onPress={handleSubmit(onSubmit)}
			>
				Sign in
			</Button>
		</ScrollLayout>
	)
}

export default Login
