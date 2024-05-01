import { rtkQueryErrorLogger } from '@/redux/middlewares/error.middleware'
import { reducers } from '@/redux/root-reducer'
import { reduxStorage } from '@/utils/mmkv-wrapper'
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
	key: 'root',
	storage: reduxStorage,
	whitelist: ['readingUi', 'readingProgress', 'auth']
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(rtkQueryErrorLogger)
})
export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof reducers>
