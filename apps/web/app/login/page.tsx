"use client";
import { useForm } from 'react-hook-form'
import { useAction } from '../../hooks/useAction'
import type { AuthFieldsType } from '../../redux/auth/auth-types'
import Button from '../components/button/button'
import Field from '../components/field/field'

export default  function Page() {
  const { login } = useAction()
  const {  handleSubmit, control, register } = useForm<AuthFieldsType>({
    mode: 'onSubmit'
  })
  const onSubmit = (data: AuthFieldsType) => login(data)
	return (
		<div className='w-screen h-screen items-center justify-center flex'>
			<div className='w-[450px] rounded-xl bg-shade p-8'>
					<h1 className='text-3xl text-center mb-4'>Sign in</h1>
						<Field name={'email'} control={control} rules={{
							required: {
								value: true,
								message: 'Email is required'
							},
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'Entered value does not match email format'
							}
						}}
						       type="email" className='my-3'  placeholder="Enter your email" />
				<Field
					rules={{
						required: {
							value: true,
							message: 'Password is required'
						},
						minLength: {
							value: 8,
							message: 'Password must be at least 8 characters'
						},
						maxLength: {
							value: 25,
							message: 'Password must not exceed 25 characters'
						}
					}}
					control={control}
					name="password" type="password" className='my-3' placeholder="Enter your password" />
				<Button
					onClick={handleSubmit(onSubmit)}
				size={'lg'} fullWidth color={'primary'}>
					Login
				</Button>
			</div>
		</div>
	);
}
