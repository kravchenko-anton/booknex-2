'use client';
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
			{children}
	</QueryClientProvider>
)
}

export default Providers;
