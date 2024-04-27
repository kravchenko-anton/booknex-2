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
import { Color } from 'global/colors'
import { useEffect } from 'react'
import { StatusBar, View } from 'react-native'
import codePush from 'react-native-code-push'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-url-polyfill/auto'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
//TODO: повфиксить вылеты codepush после обновы
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			networkMode: 'offlineFirst',
			refetchOnWindowFocus: false,
			cacheTime: 1000 * 60 * 60,
			staleTime: 1000 * 60 * 60
		}
	}
})

Sentry.init({
	dsn: 'https://5b4c8cc2dc0a1223669dbfe7284599f1@o4506886163267584.ingest.us.sentry.io/4506886443630592',

	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1
})

const asyncStoragePersist = createAsyncStoragePersister({
	storage: AsyncStorage
})

const App = () => {
	useEffect(() => {
		codePush.sync({
			deploymentKey: 'lpmdi40ol2sLqecTc1ZWfy5k716Lp3Z2NK9yG',
			installMode: codePush.InstallMode.ON_NEXT_RESTART
		})
	}, [])
	return (
		<Provider store={store}>
			<PersistGate
				persistor={persistor}
				loading={
					<View className='bg-background h-screen w-screen'>
						<Loader />
					</View>
				}>
				<PersistQueryClientProvider
					client={queryClient}
					persistOptions={{ persister: asyncStoragePersist }}>
					<GestureHandlerRootView
						style={{
							flex: 1
						}}>
						<BottomSheetModalProvider>
							<Navigation />
						</BottomSheetModalProvider>
					</GestureHandlerRootView>
					<Toast />
				</PersistQueryClientProvider>
			</PersistGate>
			<StatusBar backgroundColor={Color.background} />
		</Provider>
	)
}

export default Sentry.wrap(codePush(App))
