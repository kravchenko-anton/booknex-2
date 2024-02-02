import Navigation from '@/features/navigation/navigation'
import { ClickOutsideProvider } from '@/shared/hooks/outside-press/provider'
import { BottomSheetProvider } from '@/shared/providers/bottom-sheet-provider'
import { persistor, store } from '@/shared/redux/store'
import Loader from '@/shared/ui/loader/loader'
import Toast from '@/shared/ui/toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { View } from 'react-native'
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

const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage
})

export default function app() {
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
					persistOptions={{ persister: asyncStoragePersister }}
				>
					<ClickOutsideProvider>
						<GestureHandlerRootView
							style={{
								flex: 1
							}}
						>
							<BottomSheetProvider>
								<Navigation />
							</BottomSheetProvider>
						</GestureHandlerRootView>
						<Toast />
					</ClickOutsideProvider>
				</PersistQueryClientProvider>
			</PersistGate>
		</Provider>
	)
}
