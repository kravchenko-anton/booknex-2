import { Header, Layout } from '@/components'
import { AnimatedView } from '@/components/animated'
import { useAction, useTypedNavigation, useTypedRoute } from '@/hooks'
import type { RegisterFieldsType } from '@/redux/auth/auth-types'
import { emailRules, passwordRules } from 'global/utils/input-validation'
import { Close } from 'icons'
import { useForm } from 'react-hook-form'
import { Color } from 'ui/colors'
import { Button, Field, Title } from 'ui/components'

const Register = () => {
	const {
		params: { selectGenres }
	} = useTypedRoute<'Registration'>()
	const { register } = useAction()
	const { control, handleSubmit } = useForm<RegisterFieldsType>()
	const { navigate } = useTypedNavigation()
	const onSubmit = (data: RegisterFieldsType) => {
		if (selectGenres.length === 0 || selectGenres.length < 3) return
		register({ ...data, genres: selectGenres })
	}
	return (
		<Layout className='h-full'>
			<AnimatedView>
				<Header
					color={Color.black}
					left={{
						icon: {
							icon: Close,
							onPress: () => {
								navigate('SelectGenres')
							}
						}
					}}
				/>
				<Title size={34} weight='bold' className='mb-2 mt-[20%]'>
					Tell us about yourself
				</Title>
				<Title size={18} weight='light' color={Color.gray} className='mb-4'>
					Enter your credentials to continue
				</Title>
				<Field control={control} name='name' placeholder='Name' />
				<Field
					control={control}
					name='email'
					keyboardType='email-address'
					rules={emailRules}
					placeholder='Email'
				/>
				<Field
					control={control}
					name='password'
					rules={passwordRules}
					placeholder='Password'
					secureTextEntry
				/>
				<Button size='large' text='Sign up' onPress={handleSubmit(onSubmit)} />
			</AnimatedView>
		</Layout>
	)
}

export default Register
