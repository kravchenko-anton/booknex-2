import Navigation from '@/navigation/navigation'
import { persistor, store } from '@/redux/store'
import Loader from '@/ui/loader/loader'
import Toast from '@/ui/toast'
import { SENTRY_DNC } from '@/utils/config'
import { reduxStorage } from '@/utils/mmkv-wrapper'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import NetInfo from '@react-native-community/netinfo'
import * as Sentry from '@sentry/react-native'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { QueryClient, onlineManager } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { Color } from 'global/colors'
import { StatusBar, View } from 'react-native'
import codePush from 'react-native-code-push'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MMKV } from 'react-native-mmkv'
import 'react-native-url-polyfill/auto'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			networkMode: 'offlineFirst',
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 60
		}
	}
})

onlineManager.setEventListener(setOnline =>
	NetInfo.addEventListener(state => {
		setOnline(!!state.isConnected)
	})
)

export const storage = new MMKV({
	id: 'app'
})

Sentry.init({
	dsn: SENTRY_DNC,
	tracesSampleRate: 1
})

const storagePersist = createAsyncStoragePersister({
	storage: reduxStorage
})
codePush.sync({
	deploymentKey: 'lpmdi40ol2sLqecTc1ZWfy5k716Lp3Z2NK9yG',
	installMode: codePush.InstallMode.IMMEDIATE,
	mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART
})
const App = () => (
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
				persistOptions={{ persister: storagePersist }}>
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

export default Sentry.wrap(codePush(App))
