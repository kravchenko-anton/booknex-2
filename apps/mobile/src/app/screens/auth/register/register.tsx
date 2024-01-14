import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { Button, Field, Title } from '@/components/ui'
import { useAction, useTypedRoute } from '@/hooks'
import type { RegisterFieldsType } from '@/redux/auth/auth-types'
import type { RegisterSchemaType } from '@/screens/auth/register/validation'
import { registerSchema } from '@/screens/auth/register/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Color } from 'global/colors'
import { Register as RegisterIllustration } from 'global/illustrations'
import { Mail, Password } from 'icons'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'

const Register = () => {
	const {
		params: { selectGenres }
	} = useTypedRoute<'Registration'>()
	const { register } = useAction()
	const { control, handleSubmit } = useForm<RegisterSchemaType>({
		resolver: zodResolver(registerSchema)
	})
	const onSubmit = (data: RegisterFieldsType) => {
		if (selectGenres.length === 0 || selectGenres.length < 3) return
		register({ ...data, genres: selectGenres })
	}
	return (
		<Layout.Wrapper
			className=' px-2'
			contentContainerStyle={{
				justifyContent: 'center'
			}}
			header={
				<Layout.Header>
					<Layout.BackWithTitle title='Sign up' />
				</Layout.Header>
			}
		>
			<View className='mt-4'>
				<RegisterIllustration
					width={200}
					height={200}
					className='mx-auto mt-8 w-full'
				/>
				<View className='mt-2 items-center'>
					<Title size={32} center weight='bold'>
						Welcome to the club
					</Title>
					<Title size={18} center weight='light' color={Color.gray}>
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
							secureTextEntry
						/>
						<Button
							size='md'
							className='mb-4 mt-1'
							variant='primary'
							onPress={handleSubmit(onSubmit)}
						>
							Sign up
						</Button>
					</View>
				</View>
			</View>
		</Layout.Wrapper>
	)
}

export default Register
