import { ClickOutsideProvider } from '@/hooks/outside-press/provider'
import Navigation from '@/navigation/navigation'
import { persistor, store } from '@/redux/store'
import Loader from '@/ui/loader/loader'
import Toast from '@/ui/toast'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
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

const asyncStoragePersist = createAsyncStoragePersister({
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
