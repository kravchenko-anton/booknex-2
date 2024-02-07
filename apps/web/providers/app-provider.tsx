'use client'
import { Toaster } from '@/components/ui/sonner'
import { persistor, store } from '@/redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as process from 'process'
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
					<GoogleOAuthProvider clientId={process.env.CLIENT_ID}>
						{children}
						<Toaster />
					</GoogleOAuthProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	)
}

export default Providers
