'use client'
import { Toaster } from '@/components/ui/sonner'
import { persistor, store } from '@/redux/store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const Providers = ({ children }: PropsWithChildren) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
				cacheTime: 1000 * 60 * 60,
				staleTime: 1000 * 60 * 60
			}
		}
	})

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<GoogleOAuthProvider clientId={String(process.env['CLIENT_ID'])}>
						{children}
						<Toaster />
					</GoogleOAuthProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	)
}

export default Providers
