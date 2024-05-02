import { zustandStorage } from '@/utils/mmkv-wrapper'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ReadingHistoryType {
	id: string
	bookSlug: string
	progress: number
	scrollPosition: number
	startDate: Date
	endDate: Date
	readingTimeMs: number
	startFromReadingScreen: boolean
}
interface ReadingProgressStoreType {
	history: ReadingHistoryType[]
}

const initialState = {
	history: [] as ReadingHistoryType[]
}

interface ReadingProgressStoreActionsType {
	newProgress: (history: ReadingHistoryType) => void
	clearHistory: () => void
	updateStartFromReadingScreen: (
		data: Pick<ReadingHistoryType, 'id'> & { startFromReadingScreen: boolean }
	) => void
}
export const useReadingProgressStore = create<
	ReadingProgressStoreType & ReadingProgressStoreActionsType
>()(
	persist(
		set => ({
			...initialState,
			// addNewProgress if history with this id exists, update info
			newProgress: newHistory => {
				set(state => {
					if (state.history.some(h => h.id === newHistory.id)) {
						// update info in old history
						return {
							...state,
							history: state.history.map(history =>
								history.id === newHistory.id ? newHistory : history
							)
						}
					}
					return { ...state, history: [...state.history, newHistory] }
				})
			},
			clearHistory: () => set(state => ({ ...state, history: [] })),
			updateStartFromReadingScreen: (
				data: Pick<ReadingHistoryType, 'id' | 'startFromReadingScreen'>
			) =>
				set(state => ({
					...state,
					history: state.history.map(h =>
						h.id === data.id
							? { ...h, startFromReadingScreen: data.startFromReadingScreen }
							: h
					)
				}))
		}),
		{
			name: 'progress-store',
			storage: createJSONStorage(() => zustandStorage)
		}
	)
)
