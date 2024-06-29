import { useTypedNavigation } from '@/hooks'
import { useAuthStore } from '@/screens/auth/store/auth-store'
import { useAuthorize } from '@/screens/auth/useAuthorize'
import { Button, Field, ScrollLayout } from '@/ui'
import * as Header from '@/ui/header/header'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	AuthSchema,
	type AuthDtoType
} from 'global/validation/auth/auth.schema'
import { Mail, Password } from 'icons'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'

const Login = () => {
	const { navigate } = useTypedNavigation()
	const mailLogin = useAuthStore(state => state.mailLogin)
	const { isLoading: authLoading } = useAuthorize()
	const { control, handleSubmit } = useForm<AuthDtoType>({
		mode: 'onSubmit',
		resolver: zodResolver(AuthSchema)
	})

	const onSubmit: SubmitHandler<AuthDtoType> = ({ password, email }) =>
		mailLogin({ password, email })

	return (
		<>
			<Header.Head>
				<Header.BackWithTitle title='Login in with email' />
				<Header.Button
					variant='foreground'
					onPress={() => navigate('Register')}>
					Sign up
				</Header.Button>
			</Header.Head>
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
					isLoading={authLoading === 'mail-login'}
					variant='primary'
					className='mb-4 mt-2'
					onPress={handleSubmit(onSubmit)}>
					Sign in
				</Button>
			</ScrollLayout>
		</>
	)
}

export default Login
