"use client";
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useForm } from 'react-hook-form'
import type { AuthFieldsType } from '../../../mobile/src/redux/auth/auth-types'

export default  function Page() {
  const {  handleSubmit } = useForm<AuthFieldsType>({
    mode: 'onSubmit'
  })
  const onSubmit = (data: AuthFieldsType) => console.log(data)
	return (
		<div className='w-screen h-screen items-center justify-center flex'>
			<div className='w-[450px] rounded-xl bg-shade p-8'>
					<h1 className='text-3xl text-center mb-4'>Sign in</h1>
			<Input
        isRequired  errorMessage={
        'Please enter a valid email address'
      }  type="email" label="Email" />
			<Input isRequired isClearable  type="email" className='my-3' label="Email" placeholder="Enter your email" />
				<Button  size={'lg'} fullWidth variant="flat" >
					Login
				</Button>
			</div>
		</div>
	);
}
