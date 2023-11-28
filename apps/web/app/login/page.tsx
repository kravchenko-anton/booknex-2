"use client";
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Controller, useForm } from 'react-hook-form'
import { useAction } from '../../hooks/useAction'
import { useAuth } from '../../hooks/useAuth'
import type { AuthFieldsType } from '../../redux/auth/auth-types'

export default  function Page() {
	const { user } = useAuth()
  const { login } = useAction()
  const {  handleSubmit, control } = useForm<AuthFieldsType>({
    mode: 'onSubmit'
  })

  const onSubmit = (data: AuthFieldsType) => login(data)
	return (
		<div className='w-screen h-screen items-center justify-center flex'>
			<div className='w-[450px] rounded-xl bg-shade p-8'>
					<h1 className='text-3xl text-center mb-4'>Sign in</h1>
				<Controller
					control={control}
					name={'email'}
					rules={{ required: {
							value: true,
							message: 'Password is required'
						},
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: 'Entered value does not match email format'
						}
					}}
					render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
						<Input isRequired
						       onChange={onChange}
						       onBlur={onBlur}
						       errorMessage={(error?.message) ?? null}
						       value={(value ?? '').toString()}
						       type="email" className='my-3' label="Email"  placeholder="Enter your email" />

					)}
				/>

				<Controller
					control={control}
					name={'password'}
					rules={{ required: {
						value: true,
						message: 'Password is required'
						}, minLength: {
						value: 8,
						message: 'Password must be at least 8 characters'
						},
						maxLength: {
						value: 36,
						message: 'Password must be at most 36 characters'
						}
					}}
					render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
						<Input isRequired
						        onChange={onChange}
						       onBlur={onBlur}
						       errorMessage={(error?.message) ?? null}
									value={(value ?? '').toString()}
						       type="password" className='my-3' label="Password" placeholder="Enter your password" />

					)}
				/>
				<Button
					onClick={handleSubmit(onSubmit)}
				size={'lg'} fullWidth variant="flat" >
					Login
				</Button>
			</div>
		</div>
	);
}
