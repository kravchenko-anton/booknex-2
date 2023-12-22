import { Header, Layout } from '@/components'
import { useAction } from '@/hooks'
import type { AuthFieldsType } from '@/redux/auth/auth-types'
import { emailRules, passwordRules } from 'global/utils/input-validation'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Button, Field, Title } from 'ui/components'

const Login = () => {
	const { login } = useAction()
	const { control, handleSubmit } = useForm<AuthFieldsType>({
		mode: 'onSubmit'
	})
	const onSubmit: SubmitHandler<AuthFieldsType> = ({ password, email }) =>
		login({ password, email })
	return (
		<Layout>
			<Header />
			<View className='mt-[20%]'>
				<Title size={34} weight='bold' className='mb-2'>
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
					rules={emailRules}
				/>
				<Field
					control={control}
					name='password'
					placeholder='Password'
					secureTextEntry={true}
					rules={passwordRules}
				/>
				<Button
					onPress={handleSubmit(onSubmit)}
					size='medium'
					text='Sign in'
					className='mt-4'
				/>
			</View>
		</Layout>
	)
}

export default Login
