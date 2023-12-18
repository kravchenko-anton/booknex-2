import Toast from '@/components/toast'
import Alert from '@/components/ui/alert/alert'
import BottomSheet from '@/components/ui/bottom-sheet/bottom-sheet'
import EventProvider from '@/hooks/outside-press/components/event-provider'
import Navigation from '@/navigation/navigation'
import { persistor, store } from '@/redux/store'
import FullScreenLoader from '@booknex/ui/'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { StatusBar, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Color } from 'ui/colors'

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
			<PersistGate persistor={persistor} loading={<View className="w-screen h-screen bg-background">
				<FullScreenLoader />
			</View>
			}>
				<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{ persister: asyncStoragePersister }}
				>
					<EventProvider>
						<GestureHandlerRootView style={flexStyle}>
							<Navigation />
							<BottomSheet />
						</GestureHandlerRootView>
					</EventProvider>
					<Toast />
					<Alert />
					<StatusBar backgroundColor={Color.background} />
				</PersistQueryClientProvider>
			</PersistGate>
		</Provider>
	)
}
