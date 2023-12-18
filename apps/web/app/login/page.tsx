'use client'
import { useForm } from 'react-hook-form'
import Button from '../../../../libs/ui/react/src/button/button'
import Field from '../../../../libs/ui/react/src/field/field'
import { useAction } from '../../hooks/useAction'
import type { AuthFieldsType } from '../../redux/auth/auth-types'

export default function Page() {
	const { login } = useAction()
	const { handleSubmit, control } = useForm<AuthFieldsType>({
		mode: 'onSubmit'
	})
	const onSubmit = (data: AuthFieldsType) => login(data)
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<div className="bg-shade w-[450px] rounded-xl p-8">
				<h1 className="mb-4 text-center text-3xl">Sign in</h1>
				<Field
					name="email"
					control={control}
					type="email"
					placeholder="Enter your email"
				/>
				<Field
					control={control}
					className="my-1.5"
					name="password"
					type="password"
					placeholder="Enter your password"
				/>
				<Button
					onClick={handleSubmit(onSubmit)}
					size="lg"
					fullWidth
					color="primary">
					Login
				</Button>
			</div>
		</div>
	)
}
