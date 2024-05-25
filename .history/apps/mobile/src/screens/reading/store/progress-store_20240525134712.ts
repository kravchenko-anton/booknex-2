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

//TODO: добавить состояние загрузки, ошибкок и так далее. оптимизировать под оффлайн
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
	getLibrary: () => libraryType
	getStatistic: () => UserStatistics | null
}
export const useReadingProgressStore = create<
	ReadingProgressStoreType & ReadingProgressStoreActionsType
>()(
	persist(
		(set, getState) => ({
			...initialState,
			getLibrary: () => {
				const library = getState().library
				const history = getState().history
				console.log('history in getLibrary', history)
				if (history.length === 0 && library) {
					console.log('return library from store, no history and library exist')
					return library
				}
				api.user
					.library(history)
					.then(({ data: response }) => {
						if (!response) return
						console.log('return library from api,  history and library exist')
						set({
							library: {
								...response,
								readingBooks: compareReadingBooks(
									response.readingBooks,
									history
								)
							},
							history: []
						})
						return {
							...response,
							readingBooks: compareReadingBooks(response.readingBooks, history)
						}
					})
					.catch(error => {
						console.log(error, 'error in library sync')
						errorToast('Failed to sync library')
					})
				return library
			},
			getStatistic: () => {
				const { history, statistics } = getState()
				if (history.length === 0 && statistics) {
					console.log(
						'return statistics from store, no history and statistics exist'
					)
					return statistics
				}
				api.user
					.statistics(history)
					.then(({ data: response }) => {
						console.log(
							'return statistics from api, no history and statistics exist',
							response
						)
						set({ statistics: response, history: [] })
						return response
					})
					.catch(error => {
						console.log(error, 'error in statistics sync')
						errorToast('Failed to sync statistics')
					})
				return statistics
			},

			newProgress: newHistory => {
				console.log('new progress', newHistory)
				set(state => {
					if (state.history.some(h => h.id === newHistory.id)) {
						console.log(
							'update info in old history',
							newHistory.id,
							newHistory.endProgress
						)
						return {
							...state,
							history: state.history.map(history =>
								history.id === newHistory.id ? newHistory : history
							)
						}
					}
					console.log('add new history', newHistory.id, newHistory.endProgress)
					if (
						state.history.some(
							h =>
								h.bookSlug === newHistory.bookSlug &&
								h.scrollPosition === newHistory.scrollPosition
						)
					) {
						console.log('history with this scrollPosition already exist')
						return { ...state }
					}
					return { ...state, history: [...state.history, newHistory] }
				})
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
