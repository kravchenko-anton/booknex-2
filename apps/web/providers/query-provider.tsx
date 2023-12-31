'use client'
import { persistor, store } from '@/redux/store'
import { Color } from '@/ui/colors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Modal from '../components/modal/modal'

function Providers({ children }: PropsWithChildren) {
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
					{children}
					<Toaster
						toastOptions={{
							style: {
								background: Color.vibrant,
								color: Color.white
							}
						}}
					/>
					<Modal />
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	)
}

export default Providers
