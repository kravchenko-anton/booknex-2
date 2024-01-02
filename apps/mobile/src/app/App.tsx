import Alert from '@/components/alert/alert'
import BottomSheet from '@/components/bottom-sheet/bottom-sheet'
import Toast from '@/components/toast'
import { ClickOutsideProvider } from '@/hooks/outside-press/Provider'
import Navigation from '@/navigation/navigation'
import { persistor, store } from '@/redux/store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { StatusBar, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Color } from 'ui/colors'
import { Loader } from 'ui/components'

const flexStyle = {
	flex: 1
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 60 * 24,
			networkMode: 'offlineFirst',
			refetchOnWindowFocus: false,
			refetchOnReconnect: false
		}
	}
})

const asyncStoragePersister = createAsyncStoragePersister({
	storage: AsyncStorage
})
export default function App() {
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
						<GestureHandlerRootView style={flexStyle}>
							<Navigation />
							<BottomSheet />
						</GestureHandlerRootView>
						<Toast />
						<Alert />
					</ClickOutsideProvider>
					<StatusBar backgroundColor={Color.background} />
				</PersistQueryClientProvider>
			</PersistGate>
		</Provider>
	)
}
