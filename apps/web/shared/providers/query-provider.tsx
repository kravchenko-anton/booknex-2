'use client'
import { DialogProvider } from '@/shared/providers/dialog-provider'
import { SheetProvider } from '@/shared/providers/sheet-provider'
import { persistor, store } from '@/shared/redux/store'
import { Toaster } from '@/shared/ui/sonner'
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
