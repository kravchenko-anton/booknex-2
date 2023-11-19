import Header from '@/components/header/header'
import Button from '@/components/ui/button/button'
import Field from '@/components/ui/field/field'
import { Title } from '@/components/ui/title/title'
import { useAction } from '@/hooks/useAction'
import type { RegisterFieldsType } from '@/redux/auth/auth-types'
import { popupAnimation } from '@/screens/auth/welcome/popup-animation'
import { AnimatedView } from '@/types/component-types'
import type { PopupTypes } from '@/types/global'
import { Color } from '@/utils/color'
import { emailRules, passwordRules } from '@/utils/input-validation'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

export interface EnterFieldProperties extends PopupTypes<'genres' | 'fields'> {
	defaultEmail: string
	selectGenres: string[]
}

const EnterField: FC<EnterFieldProperties> = ({
	isActivePopup,
	defaultEmail,
	selectGenres,
	setIsActivePopup
}) => {
	const { register } = useAction()
	const { control, handleSubmit } = useForm<RegisterFieldsType>()
	const onSubmit = (data: RegisterFieldsType) => {
		if (selectGenres.length === 0 || selectGenres.length < 3) return
		register({ ...data, genres: selectGenres })
	}
	const { showAnimation } = popupAnimation(isActivePopup)
	return (
		<AnimatedView style={showAnimation}>
			<Header
				color={Color.black}
				left={{
					icon: {
						name: 'x',
						onPress: () => {
							setIsActivePopup('genres')
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
				defaultValue={defaultEmail}
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
	)
}

export default EnterField
