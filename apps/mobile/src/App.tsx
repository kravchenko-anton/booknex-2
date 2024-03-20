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
import React, { useState } from 'react'
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
const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL }

const App = () => {
	const [isSyncInProgress, setIsSyncInProgress] = useState(false)

	React.useEffect(() => {
		if (!isSyncInProgress) {
			setIsSyncInProgress(true)
			codePush
				.sync(
					codePushOptions,
					status => {
						switch (status) {
							case codePush.SyncStatus.CHECKING_FOR_UPDATE: {
								console.log('Checking for updates.')
								break
							}
							case codePush.SyncStatus.DOWNLOADING_PACKAGE: {
								console.log('Downloading package.')
								break
							}
							case codePush.SyncStatus.INSTALLING_UPDATE: {
								console.log('Installing update.')
								break
							}
							case codePush.SyncStatus.UP_TO_DATE: {
								console.log('Up-to-date.')
								break
							}
							case codePush.SyncStatus.UPDATE_INSTALLED: {
								console.log('Update installed.')
								break
							}
						}
					},
					error => {
						console.log('An error occurred. ' + error)
					}
				)
				.finally(() => {
					setIsSyncInProgress(false)
				})
		}
	}, [])
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
				</PersistQueryClientProvider>
			</PersistGate>
		</Provider>
	)
}

export default codePush(Sentry.wrap(App))
