"use client";
import { useForm } from 'react-hook-form'
import { emailRules, passwordRules } from '../../../../libs/global/utils/input-validation'
import Button from '../../components/button/button'
import Field from '../../components/field/field'
import { useAction } from '../../hooks/useAction'
import type { AuthFieldsType } from '../../redux/auth/auth-types'

export default  function Page() {
  const { login } = useAction()
  const {  handleSubmit, control } = useForm<AuthFieldsType>({
    mode: 'onSubmit'
  })
  const onSubmit = (data: AuthFieldsType) => login(data)
	return (
		<div className='w-screen h-screen items-center justify-center flex'>
			<div className='w-[450px] rounded-xl bg-shade p-8'>
					<h1 className='text-3xl text-center mb-4'>Sign in</h1>
						<Field name={'email'} control={control} rules={emailRules}
						       type="email" placeholder="Enter your email" />
				<Field
					rules={passwordRules}
					control={control}
					name="password" type="password"   placeholder="Enter your password" />
				<Button
					onClick={handleSubmit(onSubmit)}
				size={'lg'} fullWidth color={'primary'}>
					Login
				</Button>
			</div>
		</div>
	);
}
