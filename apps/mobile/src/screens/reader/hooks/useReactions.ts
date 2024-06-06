import api from '@/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateReaction } from 'global/api-client'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'

export const useReactions = (bookSlug: string) => {
	const queryClient = useQueryClient()

	const {
		mutateAsync: createReactionMutation,
		isPending: createReactionLoading
	} = useMutation({
		mutationKey: MutationKeys.reaction.create,
		mutationFn: (data: CreateReaction) => api.reaction.create(data)
	})

	const { mutateAsync: removeReaction, isPending: removeReactionLoading } =
		useMutation({
			mutationKey: MutationKeys.reaction.remove,
			mutationFn: (id: string) => api.reaction.remove(id)
		})

	const { data: reactionBookList, isLoading: reactionBookListLoading } =
		useQuery({
			queryKey: QueryKeys.reaction.bySlug(bookSlug),
			queryFn: () => api.reaction.reactionByBook(bookSlug),
			select: data => data.data,
			enabled: !!bookSlug,
			networkMode: 'offlineFirst',
			gcTime: 1000 * 60 * 60 * 24 * 365
		})

	const createReaction = async (data: CreateReaction) => {
		await createReactionMutation(data).then(() => {
			queryClient.invalidateQueries({
				queryKey: QueryKeys.reaction.bySlug(bookSlug)
			})
		})
	}

	return {
		createReaction,
		createReactionLoading,
		removeReaction,
		removeReactionLoading,
		reactionBookList,
		reactionBookListLoading
	}
}
