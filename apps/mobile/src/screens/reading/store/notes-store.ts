import { zustandStorage } from '@/utils/mmkv-wrapper'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type QuoteAndNoteType = {
	type: 'quote' | 'note'
	text: string
	bookSlug: string
	range: {
		startOffset: number
		endOffset: number
		xpath: string
	}
}
export type NoteStoreType = {
	notesAndQuotes: QuoteAndNoteType[]
}

const initialState: NoteStoreType = {
	notesAndQuotes: []
	// TODO: in next update
	// reactions: [],
}

interface ReadingProgressStoreActionsType {
	newNoteOrQuote: (note: QuoteAndNoteType) => void
}

export const useNotesStore = create<
	NoteStoreType & ReadingProgressStoreActionsType
>()(
	persist(
		set => ({
			...initialState,
			newNoteOrQuote: note => {
				set(state => ({
					...state,
					notesAndQuotes: [...state.notesAndQuotes, note]
				}))
			}
		}),
		{
			name: 'reading-notes',
			storage: createJSONStorage(() => zustandStorage)
		}
	)
)
