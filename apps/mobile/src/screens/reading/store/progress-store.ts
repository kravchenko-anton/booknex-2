import api from '@/api'

import {
	compareReadingBooks,
	type CompareReadingBooksType
} from '@/screens/library/compareReadingBooks'
import { zustandStorage } from '@/utils/mmkv-wrapper'
import { errorToast } from '@/utils/toast'
import type { UserLibraryOutput, UserStatistics } from 'global/api-client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type libraryType =
	| (Omit<UserLibraryOutput, 'readingBooks'> & {
			readingBooks: CompareReadingBooksType[]
	  })
	| null

export interface ReadingHistoryType {
	id: string
	bookSlug: string
	startProgress: number
	endProgress: number
	progressDelta: number
	scrollPosition: number
	startDate: string
	endDate: string
	readingTimeMs: number
	startFromReadingScreen: boolean
}
interface ReadingProgressStoreType {
	history: ReadingHistoryType[]
	statistics: UserStatistics | null
	library: libraryType
}

const initialState: ReadingProgressStoreType = {
	history: [],
	statistics: null,
	library: null
}

interface ReadingProgressStoreActionsType {
	newProgress: (history: ReadingHistoryType) => void
	clearHistory: () => void
	updateStartFromReadingScreen: (
		data: Pick<ReadingHistoryType, 'id'> & { startFromReadingScreen: boolean }
	) => void
	fetchLibrary: (isRefetch?: boolean) => void
	fetchStatistic: (isRefetch?: boolean) => void
	syncHistory: (history: ReadingHistoryType[]) => void
}
export const useReadingProgressStore = create<
	ReadingProgressStoreType & ReadingProgressStoreActionsType
>()(
	persist(
		(set, getState) => ({
			...initialState,
			fetchLibrary: (isRefetch = false) => {
				const history = getState().history
				console.log('history in getLibrary', history)
				if (history.length === 0 && !isRefetch)
					return console.log('no history to fetch library')

				console.log('🔵 history be sync in library', history)
				api.user
					.library(history)
					.then(({ data: result }) => {
						if (!result) return
						console.log('return library from api, no history and library exist')
						set({
							library: {
								...result,
								readingBooks: compareReadingBooks(result.readingBooks, history)
							},
							history: []
						})
					})
					.catch(error => {
						console.log(error, 'error in library sync')
						errorToast('Failed to sync library')
					})
			},
			syncHistory: (history: ReadingHistoryType[]) => {
				api.user
					.syncHistory(history)
					.catch(error => {
						console.log(error, 'error in history sync')
						errorToast('Failed to sync history')
					})
					.then(() => {
						set(({ history, ...state }) => ({ ...state, history: [] }))
					})
			},
			fetchStatistic: (isRefetch = false) => {
				const history = getState().history
				console.log('history in getStatistic', history)
				if (history.length === 0 && !isRefetch)
					return console.log('no history to fetch statistic')
				api.user
					.statistics(history)
					.then(({ data: result }) => {
						if (!result) return
						console.log(
							'return library from api, no history and statistic exist'
						)
						set({
							statistics: result,
							history: []
						})
					})
					.catch(error => {
						console.log(error, 'error in statistic sync')
						errorToast('Failed to sync statistic')
					})
			},
			newProgress: newHistory => {
				const history = getState().history

				if (history.some(h => h.id === newHistory.id)) {
					console.log('⚠️ update progress', newHistory)
					return set(state => ({
						...state,
						// find and replace old history with this id to new
						history: state.history.map(({ ...h }) =>
							h.id === newHistory.id ? newHistory : h
						)
					}))
				}

				console.log('⚠️ new progress', newHistory)
				set(state => ({
					...state,
					needSync: true,
					history: [...state.history, newHistory]
				}))
			},
			clearHistory: () =>
				set(({ history, ...state }) => ({ ...state, history: [] })),
			updateStartFromReadingScreen: (
				data: Pick<ReadingHistoryType, 'id' | 'startFromReadingScreen'>
			) =>
				set(state => ({
					...state,
					history: state.history.map(({ ...h }) =>
						h.id === data.id
							? { ...h, startFromReadingScreen: data.startFromReadingScreen }
							: h
					)
				}))
		}),
		{
			name: 'reading-progress-storage',
			storage: createJSONStorage(() => zustandStorage)
		}
	)
)
