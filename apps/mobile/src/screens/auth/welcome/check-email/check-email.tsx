import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { popupAnimation } from '@/screens/auth/welcome/popup-animation'
import { authService } from '@/services/auth-service'
import { AnimatedView } from '@/types/component-types'
import type { PopupTypes } from '@/types/global'
import { Color } from '@/utils/color'
import { useDebounce } from '@/utils/useDebounce'
import { useMutation } from '@tanstack/react-query'
import type { FC } from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const CheckEmail: FC<
	Pick<PopupTypes<'check-email' | 'description-card'>, 'isActivePopup'>
> = ({ isActivePopup }) => {
	const { control, watch } = useForm<{ email: string }>({ mode: 'onChange' })
	const { navigate } = useTypedNavigation()
	const { showAnimation } = popupAnimation(isActivePopup)
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
		<AnimatedView style={showAnimation}>
			<Title size={34} color={Color.secondary} weight='bold'>
				Log in or Sign up
			</Title>
			<Title size={18} color={Color.gray} className='mb-4' weight='light'>
				Enter your email to continue
			</Title>
			<Field
				control={control}
				name={'email'}
				keyboardType='email-address'
				placeholder={'Enter you Email'}
			/>
			<Button
				size={'medium'}
				disabled={!noValidEmail}
				variant={isEmailExists?.isExist ? 'secondary' : 'primary'}
				className='mt-2'
				width={'100%'}
				onPress={() => {
					navigate(isEmailExists?.isExist ? 'Login' : 'Registration', {
						defaultEmail: emailField
					})
				}}
				text={
					noValidEmail
						? isEmailExists?.isExist
							? 'Sign in'
							: 'Sign up'
						: 'continue'
				}
			/>
		</AnimatedView>
	)
}

export default CheckEmail
