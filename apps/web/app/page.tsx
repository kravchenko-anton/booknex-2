'use client'
import { Button, Field } from '@/components/ui'
import { useAction } from '@/hooks'
import { loginRoute } from '@/providers/secure-route'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { Mail, Password } from 'icons'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'
import type { AuthFieldsType } from '../../mobile/src/redux/auth/auth-types'

const Index: FC = () => {
	const { mailLogin, googleLogin } = useAction()
	const { handleSubmit, control } = useForm<AuthFieldsType>({
		mode: 'onSubmit'
	})

	const onSubmit = (data: AuthFieldsType) => {
		mailLogin(data)
	}

	const onGoogleLoginSuccess = async (tokenResponse: CredentialResponse) => {
		console.log(tokenResponse)
		googleLogin({
			socialId: tokenResponse.credential
		})
	}

	return (
		<div className='flex h-screen w-screen items-center justify-center'>
			<div className='bg-foreground  w-[450px] items-center justify-center rounded-xl p-8'>
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
				<div className='flex h-full w-full items-center justify-center gap-2'>
					<Button
						fullWidth
						size='md'
						variant='primary'
						onClick={handleSubmit(onSubmit)}
					>
						Login
					</Button>
					<GoogleLogin
						useOneTap
						size='large'
						shape={'rectangular'}
						theme='outline'
						onSuccess={onGoogleLoginSuccess}
					/>
				</div>
			</div>
		</div>
	)
}

export default loginRoute(Index)
