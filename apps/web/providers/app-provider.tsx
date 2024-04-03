'use client'
import { Toaster } from '@/components/ui/sonner'
import { persistor, store } from '@/redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { adminErrors, globalErrors } from 'global/errors'
import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const Providers = ({ children }: PropsWithChildren) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				cacheTime: 1000 * 60 * 60 * 24
			}
		}
	})

	const googleAuthClientID = process.env['CLIENT_ID']
	if (!googleAuthClientID)
		throw new Error(
			`${globalErrors.somethingWrong}, ${adminErrors.someConfigMissing}`
		)
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<GoogleOAuthProvider clientId={googleAuthClientID}>
						{children}
						<Toaster />
					</GoogleOAuthProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	)
}

export default Providers
