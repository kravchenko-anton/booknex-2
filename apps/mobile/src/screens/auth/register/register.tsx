import type { RegisterFieldsType } from '@/features/auth/action/auth-types'
import type { AuthValidationSchemaType } from '@/features/auth/validation'
import { authValidationSchema } from '@/features/auth/validation'
import { useAction, useTypedRoute } from '@/shared/hooks'
import { Button, Field, ScrollLayout, Title } from '@/shared/ui'
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
	const { control, handleSubmit } = useForm<AuthValidationSchemaType>({
		resolver: zodResolver(authValidationSchema)
	})
	const onSubmit = (data: RegisterFieldsType) => {
		if (selectGenres.length === 0 || selectGenres.length < 3) return
		register({ ...data, genres: selectGenres })
	}
	return (
		<ScrollLayout className='px-2'>
			<View className='mt-4'>
				<RegisterIllustration
					width={200}
					height={200}
					className='mx-auto mt-2 w-full'
				/>
				<View className='mt-2 items-center'>
					<Title size={30} center weight='bold'>
						Welcome to the club 🎉
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
							className='my-1.5'
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
		</ScrollLayout>
	)
}

export default Register
