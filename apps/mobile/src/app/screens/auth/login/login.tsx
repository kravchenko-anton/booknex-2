import { Layout } from '@/components'
import * as Header from '@/components/header/header'
import { useAction } from '@/hooks'
import type { AuthFieldsType } from '@/redux/auth/auth-types'
import type { LoginSchemaType } from '@/screens/auth/login/validation'
import { loginSchema } from '@/screens/auth/login/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Button, Field, Title } from 'ui/components'

const Login = () => {
	const { login } = useAction()
	const { control, handleSubmit } = useForm<LoginSchemaType>({
		mode: 'onSubmit',
		resolver: zodResolver(loginSchema)
	})
	const onSubmit: SubmitHandler<AuthFieldsType> = ({ password, email }) =>
		login({ password, email })
	return (
		<Layout>
			<Header.Head />
			<View className='mt-[20%]'>
				<Title size={34} weight='bold'>
					Welcome back
				</Title>
				<Title size={18} weight='light' color={Color.gray} className='mb-4'>
					Enter your credentials to continue
				</Title>
				<Field
					control={control}
					name='email'
					keyboardType='email-address'
					placeholder='Email'
				/>
				<Field
					control={control}
					name='password'
					placeholder='Password'
					secureTextEntry={true}
				/>
				<Button
					onPress={handleSubmit(onSubmit)}
					size='md'
					variant='primary'
					className='mt-2'
				>
					Sign in
				</Button>
			</View>
		</Layout>
	)
}

export default Login
