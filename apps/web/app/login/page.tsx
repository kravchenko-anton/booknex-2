'use client'
import type { AuthFieldsType } from '@/features/auth/action/auth-types'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import axios from 'axios'
import { SERVER_URL } from 'global/api-config'
import { useRouter } from 'next/navigation'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

const Page: FC = () => {
	const router = useRouter()
	const { handleSubmit, control } = useForm<AuthFieldsType>({
		mode: 'onSubmit'
	})

	const onSuccess = async (tokenResponse: CredentialResponse) => {
		console.log(tokenResponse)
		if (!tokenResponse.credential) return
		const { data, status } = await axios.post(`${SERVER_URL}/auth/login`, {
			idToken: tokenResponse.credential
		})

		if (status === 200 || status === 201) {
			console.log(
				{
					token: data.token,
					refreshToken: data.refreshToken,
					tokenExpires: data.tokenExpires
				},
				data.user
			)
		}
	}

	return (
		<div className='flex h-screen w-screen items-center justify-center'>
			<div className='bg-foreground w-[450px] rounded-xl p-8'>
				<h1 className='mb-4 text-center text-3xl text-white'>Sign in</h1>
				<GoogleLogin onSuccess={onSuccess} />
			</div>
		</div>
	)
}

export default Page
