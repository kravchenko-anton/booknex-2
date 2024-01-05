import { Layout } from '@/components'
import { AnimatedView } from '@/components/animated'
import * as Header from '@/components/header/header'
import { useAction, useTypedRoute } from '@/hooks'
import type { RegisterFieldsType } from '@/redux/auth/auth-types'
import type { RegisterSchemaType } from '@/screens/auth/register/validation'
import { registerSchema } from '@/screens/auth/register/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Color } from 'ui/colors'
import { Button, Field, Title } from 'ui/components'

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
		<Layout className='h-full'>
			<AnimatedView>
				<Header.Head />
				<Title size={34} weight='bold' className='mb-2 mt-[20%]'>
					Sign up
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
					secureTextEntry
				/>
				<Button
					size='md'
					className='mt-1'
					variant='primary'
					onPress={handleSubmit(onSubmit)}
				>
					Sign up
				</Button>
			</AnimatedView>
		</Layout>
	)
}

export default Register
