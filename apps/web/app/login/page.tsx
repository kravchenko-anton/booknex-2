'use client'
import type { AuthFieldsType } from '@/features/auth/action/auth-types'
import { useAction, useAuth } from '@/shared/hooks'
import { Button, Field } from '@/shared/ui'
import { Mail, Password } from 'icons'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const Page: FC = () => {
	const { login } = useAction()
	const router = useRouter()
	const { user } = useAuth()
	//TODO: сделать валидацию через zod
	const { handleSubmit, control } = useForm<AuthFieldsType>({
		mode: 'onSubmit'
	})
	useEffect(() => {
		if (user) router.replace('/admin/dashboard')
	}, [user, router])
	const onSubmit = (data: AuthFieldsType) => {
		login(data)
	}
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

export default Page
