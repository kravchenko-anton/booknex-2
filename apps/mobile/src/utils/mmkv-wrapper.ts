import { storage } from '@/App'
import type { Storage } from 'redux-persist'
import type { StateStorage } from 'zustand/middleware'

export const zustandStorage: StateStorage = {
	setItem: (name, value) => storage.set(name, value),
	getItem: name => {
		const value = storage.getString(name)
		return value ?? null
	},
	removeItem: name => storage.delete(name)
}

export const reduxStorage: Storage = {
	setItem: (key, value) => {
		storage.set(key, value)
		return Promise.resolve(true)
	},
	getItem: key => {
		const value = storage.getString(key)
		return Promise.resolve(value)
	},
	removeItem: key => {
		storage.delete(key)
		return Promise.resolve()
	}
}
