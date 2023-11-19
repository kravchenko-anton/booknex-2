import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import type { AuthFieldsType } from '@/redux/auth/auth-types'
import { Color } from '@/utils/color'
import { emailRules, passwordRules } from '@/utils/input-validation'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const Login = () => {
	const {
		params: { defaultEmail }
	} = useTypedRoute<'Login'>()
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
				<Title size={34} weight={'bold'} className='mb-2'>
					Welcome back
				</Title>
				<Title size={18} weight={'light'} color={Color.gray} className='mb-4'>
					Enter your credentials to continue
				</Title>
				<Field
					control={control}
					defaultValue={defaultEmail}
					name={'email'}
					keyboardType={'email-address'}
					placeholder={'Email'}
					rules={emailRules}
				/>
				<Field
					control={control}
					name={'password'}
					placeholder={'Password'}
					secureTextEntry={true}
					rules={passwordRules}
				/>
				<Button
					onPress={handleSubmit(onSubmit)}
					size={'medium'}
					text={'Sign in'}
					className='mt-2'
				/>
			</View>
		</Layout>
	)
}

export default Login
