import { zustandStorage } from '@/utils/mmkv-wrapper'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

//TODO: добавить состояние загрузки, ошибкок и так далее. Пофиксить перерендер
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
}

const initialState: ReadingProgressStoreType = {
	history: []
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
			newProgress: newHistory => {
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
