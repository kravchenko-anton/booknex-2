import { useAuthorize } from '@/screens/auth/useAuthorize'

import { useTypedNavigation } from '@/hooks'
import { useAuthStore } from '@/screens/auth/store/auth-store'
import { Button, Field, ScrollLayout } from '@/ui'
import * as Header from '@/ui/header/header'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	AuthSchema,
	type AuthDtoType
} from 'global/validation/auth/auth.schema'
import { Mail, Password } from 'icons'
import { useForm, type SubmitHandler } from 'react-hook-form'

const Register = () => {
	const { navigate } = useTypedNavigation()
	const { isLoading: authLoading } = useAuthorize()
	const { mailRegister } = useAuthStore(state => ({
		mailRegister: state.mailRegister
	}))
	const { control, handleSubmit } = useForm<AuthDtoType>({
		mode: 'onSubmit',
		resolver: zodResolver(AuthSchema)
	})

	const onSubmit: SubmitHandler<AuthDtoType> = ({ email, password }) => {
		mailRegister({
			password,
			email
		})
	}
	return (
		<>
			<Header.Head>
				<Header.BackWithTitle title='Create an account' />
				<Header.Button variant='foreground' onPress={() => navigate('Login')}>
					Sign in
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
					className='my-1.5'
					placeholder='Password'
				/>
				<Button
					isLoading={authLoading === 'mail-register'}
					size='lg'
					className='mb-2 mt-1'
					variant='primary'
					onPress={handleSubmit(onSubmit)}>
					Sign up
				</Button>
			</ScrollLayout>
		</>
	)
}

export default Register
