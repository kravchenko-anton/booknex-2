import type { reactionsTitles } from '@/screens/reading/reactions'
import { zustandStorage } from '@/utils/mmkv-wrapper'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ReactionType = {
	text: string
	bookSlug: string
	range: {
		startOffset: number
		endOffset: number
		xpath: string
	}
	reaction: reactionsTitles
}
export type ReaderStoreType = {
	reactions: ReactionType[]
}

const initialState: ReaderStoreType = {
	reactions: []
}

interface ReadingProgressStoreActionsType {
	newReaction: (note: ReactionType) => void
}

export const useReactionsStore = create<
	ReaderStoreType & ReadingProgressStoreActionsType
>()(
	persist(
		set => ({
			...initialState,
			newReaction: reaction => {
				set(state => ({
					reactions: [...state.reactions, reaction]
				}))
			}
		}),
		{
			name: 'reading-notes',
			storage: createJSONStorage(() => zustandStorage)
		}
	)
)
