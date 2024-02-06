'use client'
import { useAction } from '@/hooks'
import { loginRoute } from '@/providers/secure-route'
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import type { FC } from 'react'

const Page: FC = () => {
	const { login } = useAction()

	const onSuccess = async (tokenResponse: CredentialResponse) => {
		console.log(tokenResponse)
		if (!tokenResponse.credential) return
		console.log(tokenResponse.credential)
		login({
			socialId: tokenResponse.credential
		})
	}

	return (
		<div className='flex h-screen w-screen items-center justify-center'>
			<div className='bg-foreground flex w-[450px] items-center justify-center rounded-xl p-8'>
				<GoogleLogin onSuccess={onSuccess} />
			</div>
		</div>
	)
}

export default loginRoute(Page)
