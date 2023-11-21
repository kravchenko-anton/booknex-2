import Header from '@/components/header/header'
import Layout from '@/components/layout/layout'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { Close } from '@/icons'
import type { RegisterFieldsType } from '@/redux/auth/auth-types'
import { AnimatedView } from '@/types/component-types'
import { Color } from '@/utils/color'
import { emailRules, passwordRules } from '@/utils/input-validation'
import { useForm } from 'react-hook-form'

const Register = () => {
	const {
		params: {  selectGenres }
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
				<Title size={34} weight={'bold'} className='mb-2 mt-[20%]'>
					Tell us about yourself
				</Title>
				<Title size={18} weight={'light'} color={Color.gray} className='mb-4'>
					Enter your credentials to continue
				</Title>
				<Field control={control} name={'name'} placeholder={'Name'} />
				<Field
					control={control}
					name={'email'}
					keyboardType={'email-address'}
					rules={emailRules}
					placeholder={'Email'}
				/>
				<Field
					control={control}
					name={'password'}
					rules={passwordRules}
					placeholder={'Password'}
					secureTextEntry
				/>
				<Button
					size={'large'}
					text={'Sign up'}
					onPress={handleSubmit(onSubmit)}
				/>
			</AnimatedView>
		</Layout>
	)
}

export default Register
