import { ClickOutsideProvider } from '@/hooks/outside-press/provider'
import Navigation from '@/navigation/navigation'
import { persistor, store } from '@/redux/store'
import Loader from '@/ui/loader/loader'
import Toast from '@/ui/toast'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Sentry from '@sentry/react-native'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { View } from 'react-native'
import { default as codePush } from 'react-native-code-push'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			networkMode: 'offlineFirst',
			refetchOnWindowFocus: false,
			refetchOnReconnect: false
		}
	}
})

Sentry.init({
	dsn: 'https://db7342e99f043024192f33c9678bf56a@o4506886163267584.ingest.us.sentry.io/4506886375145472',

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1
})

const asyncStoragePersist = createAsyncStoragePersister({
	storage: AsyncStorage
})

function app() {
	return (
		<Provider store={store}>
			<PersistGate
				persistor={persistor}
				loading={
					<View className='bg-background h-screen w-screen'>
						<Loader />
					</View>
				}
			>
				<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{ persister: asyncStoragePersist }}
				>
					<ClickOutsideProvider>
						<GestureHandlerRootView
							style={{
								flex: 1
							}}
						>
							<BottomSheetModalProvider>
								<Navigation />
							</BottomSheetModalProvider>
						</GestureHandlerRootView>
						<Toast />
					</ClickOutsideProvider>
				</PersistQueryClientProvider>
			</PersistGate>
		</Provider>
	)
}

export default codePush(Sentry.wrap(app))
