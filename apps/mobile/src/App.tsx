import Navigation from '@/navigation/navigation'
import Toast from '@/ui/toast'
import { clientStorage } from '@/utils/mmkv-wrapper'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import NetInfo from '@react-native-community/netinfo'
import * as Sentry from '@sentry/react-native'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { onlineManager, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { Color } from 'global/colors'
import { StatusBar } from 'react-native'
import codePush from 'react-native-code-push'
import Config from 'react-native-config'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MMKV } from 'react-native-mmkv'
import 'react-native-svg'
import 'react-native-url-polyfill/auto'
import '../env-config'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			networkMode: 'offlineFirst',
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 60, // 1 hour
			gcTime: 1000 * 60 * 60 * 24 * 7 // 1 week
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
	dsn: Config.SENTRY_DNC,
	tracesSampleRate: 1,
	integrations: [Sentry.metrics.metricsAggregatorIntegration()]
})

export const clientPersister: any = createSyncStoragePersister({
	storage: clientStorage
})

codePush.sync({
	deploymentKey: 'lpmdi40ol2sLqecTc1ZWfy5k716Lp3Z2NK9yG',
	installMode: codePush.InstallMode.IMMEDIATE,
	mandatoryInstallMode: codePush.InstallMode.IMMEDIATE
})
const App = () => (
	// useEffect(() => {
	// 	adapty.activate('public_live_0pAJgt4m.7LNqw5dmfPigmxdZUuv3')
	// }, [])
	<PersistQueryClientProvider
		client={queryClient}
		persistOptions={{ persister: clientPersister }}>
		<GestureHandlerRootView
			style={{
				flex: 1
			}}>
			<BottomSheetModalProvider>
				<Navigation />
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
		<Toast />
		<StatusBar backgroundColor={Color.background} />
	</PersistQueryClientProvider>
)

export default Sentry.wrap(codePush(App))
