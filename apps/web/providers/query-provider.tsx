'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


function Providers({ children }: React.PropsWithChildren) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				cacheTime: 1000 * 60 * 60 * 24, // 24 hours
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
