import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { Button, Field, Title } from '@/components/ui'
import { useAction } from '@/hooks'
import type { AuthFieldsType } from '@/redux/auth/auth-types'
import type { LoginSchemaType } from '@/screens/auth/login/validation'
import { loginSchema } from '@/screens/auth/login/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Color } from 'global/colors'
import { Login as LoginIllustration } from 'global/illustrations'
import { Mail, Password } from 'icons'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const Login = () => {
	const { login } = useAction()
	const { control, handleSubmit } = useForm<LoginSchemaType>({
		mode: 'onSubmit',
		resolver: zodResolver(loginSchema)
	})
	const onSubmit: SubmitHandler<AuthFieldsType> = ({ password, email }) =>
		login({ password, email })
	return (
		<Layout.Wrapper
			className='px-2'
			contentContainerStyle={{
				justifyContent: 'center'
			}}
			header={
				<Layout.Header>
					<Layout.BackWithTitle title='Sign in' />
				</Layout.Header>
			}
		>
			<View className='mt-4'>
				<LoginIllustration
					width={200}
					height={200}
					className='mx-auto mt-8 w-full p-0'
				/>
				<View className='mt-4 items-center'>
					<Title size={34} weight='bold'>
						Welcome back
					</Title>
					<Title size={18} weight='light' color={Color.gray}>
						Enter your credentials to continue
					</Title>
					<View className='mt-6 w-full'>
						<Field
							icon={Mail}
							control={control}
							name='email'
							keyboardType='email-address'
							placeholder='Email'
						/>
						<Field
							icon={Password}
							control={control}
							name='password'
							placeholder='Password'
							secureTextEntry={true}
						/>
						<Button
							onPress={handleSubmit(onSubmit)}
							size='md'
							variant='primary'
							className='mb-4 mt-2'
						>
							Sign in
						</Button>
					</View>
				</View>
			</View>
		</Layout.Wrapper>
	)
}

export default Login
