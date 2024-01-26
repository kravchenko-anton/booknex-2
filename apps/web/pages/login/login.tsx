import type { AuthFieldsType } from '@/features/auth/action/auth-types'
import { useAction } from '@/shared/hooks'
import { Button, Field } from '@/shared/ui'
import { Mail, Password } from 'icons'
import { useForm } from 'react-hook-form'

const Login = () => {
	const { login } = useAction()
	//TODO: сделать валидацию через zod
	const { handleSubmit, control } = useForm<AuthFieldsType>({
		mode: 'onSubmit'
	})
	const onSubmit = (data: AuthFieldsType) => login(data)
	return (
		<div className='flex h-screen w-screen items-center justify-center'>
			<div className='bg-foreground w-[450px] rounded-xl p-8'>
				<h1 className='mb-4 text-center text-3xl text-white'>Sign in</h1>
				<Field
					icon={Mail}
					variant='muted'
					name='email'
					control={control}
					type='email'
					placeholder='Enter your email'
				/>
				<Field
					icon={Password}
					variant='muted'
					control={control}
					className='my-3'
					name='password'
					type='password'
					placeholder='Enter your password'
				/>
				<Button
					onClick={handleSubmit(onSubmit)}
					size='lg'
					fullWidth
					variant='primary'
				>
					Login
				</Button>
			</div>
		</div>
	)
}

export default Login
