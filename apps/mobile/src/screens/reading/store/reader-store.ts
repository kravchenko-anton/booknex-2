import type { reactionsTitles } from '@/screens/reading/reactions'
import { zustandStorage } from '@/utils/mmkv-wrapper'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ReactionType = {
	id: string
	text: string
	bookSlug: string
	createAt: Date
	range: {
		startOffset: number
		endOffset: number
		startXPath: string
		endXPath: string
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
			},
			removeReaction: (id: string) => {
				set(state => ({
					reactions: state.reactions.filter(item => item.id !== id)
				}))
			}
		}),
		{
			name: 'reading-note',
			storage: createJSONStorage(() => zustandStorage)
		}
	)
)
