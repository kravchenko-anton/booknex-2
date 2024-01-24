import type { AuthFieldsType } from '@/features/auth/action/auth-types'
import type { AuthValidationSchemaType } from '@/features/auth/validation'
import { authValidationSchema } from '@/features/auth/validation'
import { useAction } from '@/shared/hooks'
import { Button, Field, ScrollLayout, Title } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Color } from 'global/colors'
import { Login as LoginIllustration } from 'global/illustrations'
import { Mail, Password } from 'icons'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const Login = () => {
	const { login } = useAction()
	const { control, handleSubmit } = useForm<AuthValidationSchemaType>({
		mode: 'onSubmit',
		resolver: zodResolver(authValidationSchema)
	})
	const onSubmit: SubmitHandler<AuthFieldsType> = ({ password, email }) =>
		login({ password, email })
	return (
		<ScrollLayout className='px-2'>
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
		</ScrollLayout>
	)
}

export default Login
