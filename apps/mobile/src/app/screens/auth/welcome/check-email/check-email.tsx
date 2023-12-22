import { Layout } from '@/components'
import { useTypedNavigation } from '@/hooks'
import { useDebounce } from '@/hooks/useDebounce'
import { authService } from '@/services/auth/auth-service'

import { useMutation } from '@tanstack/react-query'
import type { FC } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Button, Field, Title } from 'ui/components'

const CheckEmail: FC = () => {
	const { control, watch } = useForm<{ email: string }>({ mode: 'onChange' })
	const { navigate } = useTypedNavigation()
	const emailField = useDebounce(watch('email'), 500)
	const noValidEmail = !!(
		emailField &&
		emailField.length > 4 &&
		emailField.includes('@') &&
		emailField.includes('.')
	)

	const { data: isEmailExists, mutate: checkEmailFunction } = useMutation(
		['check-email'],
		() => authService.checkEmail(emailField)
	)
	useEffect(() => {
		if (!emailField) return
		checkEmailFunction()
	}, [emailField])
	return (
		<Layout className='relative justify-center p-4'>
			<View>
				<Title size={34} color={Color.white} weight='bold'>
					Log in or Sign up
				</Title>
				<Title size={18} color={Color.gray} className='mb-4' weight='light'>
					Enter your email to continue
				</Title>
				<Field
					control={control}
					name='email'
					keyboardType='email-address'
					placeholder='Enter you Email'
				/>
				<Button
					size='medium'
					disabled={!noValidEmail}
					variant={isEmailExists?.isExist ? 'secondary' : 'primary'}
					className='mt-2'
					width='100%'
					onPress={() => {
						navigate(isEmailExists?.isExist ? 'Login' : 'SelectGenres')
					}}
					text={
						noValidEmail
							? isEmailExists?.isExist
								? 'Sign in'
								: 'Sign up'
							: 'continue'
					}
				/>
			</View>
		</Layout>
	)
}

export default CheckEmail
