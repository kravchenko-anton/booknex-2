import { rtkQueryErrorLogger } from '@/redux/middlewares/error.middleware'
import { reducers } from '@/redux/root-reducer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: ['readingSettings', 'auth']
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false
		}).concat(rtkQueryErrorLogger)
})
export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof reducers>
