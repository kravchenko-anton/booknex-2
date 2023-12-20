'use client'
import { StyledForm, StyledWrapper } from '@/app/login/styles'
import { useAction } from '@/hooks/useAction'
import type { AuthFieldsType } from '@/redux/auth/auth-types'
import { Button, Field, H1 } from '@/ui/components'
import { Color } from '@ui/colors'
import { useForm } from 'react-hook-form'

export default function Page() {
	const { login } = useAction()
	const { handleSubmit, control } = useForm<AuthFieldsType>({
		mode: 'onSubmit'
	})

	const onSubmit = (data: AuthFieldsType) => login(data)
	return (
		<StyledWrapper>
			<StyledForm onSubmit={handleSubmit(onSubmit)}>
				<H1 center color={Color.white}>
					Sign in
				</H1>
				<Field
					name='email'
					control={control}
					type='email'
					placeholder='Enter your email'
				/>
				<Field
					control={control}
					name='password'
					type='password'
					placeholder='Enter your password'
				/>
				<Button type='submit' color='primary' size='md' fullWidth>
					Login
				</Button>
			</StyledForm>
		</StyledWrapper>
	)
}
