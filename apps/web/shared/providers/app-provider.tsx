'use client'
import { persistor, store } from '@/shared/redux/store'
import { Toaster } from '@/shared/ui/sonner'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const Providers = ({ children }: PropsWithChildren) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				cacheTime: 1000 * 60 * 60 * 24
			}
		}
	})

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<GoogleOAuthProvider
						clientId={
							'390949311214-hqfqvic7p47pt3elpne00es58k99nonh.apps.googleusercontent.com'
						}
					>
						{children}
						<Toaster />
					</GoogleOAuthProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	)
}

export default Providers
