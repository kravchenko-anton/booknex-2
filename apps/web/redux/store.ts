import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import { reducers } from './root-reducer'

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false,
			immutableCheck: false
		})
})
export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof reducers>
