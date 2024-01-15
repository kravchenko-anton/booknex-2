'use client'
import { Toaster } from '@/components/ui/sonner'
import { DialogProvider } from '@/providers/dialog-provider'
import { SheetProvider } from '@/providers/sheet-provider'
import { persistor, store } from '@/redux/store'
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
					<SheetProvider>
						<DialogProvider>
							{children}
							<Toaster />
						</DialogProvider>
					</SheetProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	)
}

export default Providers
