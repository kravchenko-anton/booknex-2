import { zustandStorage } from '@/utils/mmkv-wrapper'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
//addHistory(state, action: PayloadAction<ReadingHistoryType>) {
// 			console.log('addHistory', action.payload)
// 			state.history = [...state.history, action.payload]
// 			console.log('state.history', state.history)
// 		},
// 		clearHistory(state) {
// 			state.history = []
// 		},
// 		setStartFromReadingScreen(state, action: PayloadAction<boolean>) {
// 			state.startFromReadingScreen = action.payload
// 		}
export interface ReadingHistoryType {
	bookSlug: string
	progress: number
	scrollPosition: number
	startDate: Date
	endDate: Date
	readingTimeMs: number
}
interface ReadingProgressStoreType {
	history: ReadingHistoryType[]
	startFromReadingScreen: boolean
}

const initialState = {
	history: [] as ReadingHistoryType[],
	startFromReadingScreen: false as boolean
}

interface ReadingProgressStoreActionsType {
	addHistory: (history: ReadingHistoryType) => void
	clearHistory: () => void
	setStartFromReadingScreen: (startFromReadingScreen: boolean) => void
}
export const useReadingProgressStore = create<
	ReadingProgressStoreType & ReadingProgressStoreActionsType
>()(
	devtools(
		persist(
			set => ({
				...initialState,
				addHistory: history => {
					console.log('addHistory', history)
					return set(state => ({
						...state,
						history: [...state.history, history]
					}))
				},
				clearHistory: () => set(state => ({ ...state, history: [] })),
				setStartFromReadingScreen: startFromReadingScreen =>
					set(state => ({ ...state, startFromReadingScreen }))
			}),
			{
				name: 'progress-store',
				storage: createJSONStorage(() => zustandStorage)
			}
		)
	)
)
