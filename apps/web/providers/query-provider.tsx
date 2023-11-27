'use client';
import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'


function Providers({ children }: PropsWithChildren) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				cacheTime: 1000 * 60 * 60 * 24,
			},
		},
	})

	return (
		<QueryClientProvider
			client={queryClient}>
		<NextUIProvider>
			{children}
		</NextUIProvider>
		</QueryClientProvider>
)
}

export default Providers;
