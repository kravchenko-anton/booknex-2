import api from '@/api'
import * as Sentry from '@sentry/react-native'
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
		mutationFn: (data: CreateReaction) => api.reaction.create(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.reaction.bySlug(bookSlug)
			})
		}
	})

	const createReaction = (data: CreateReaction) => {
		if (createReactionLoading) return
		createReactionMutation(data).then(async () => {
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.reaction.bySlug(bookSlug)
			})
		})
		Sentry.metrics.increment('create-reaction')
	}

	const { data: reactionBookList } = useQuery({
		queryKey: QueryKeys.reaction.bySlug(bookSlug),
		queryFn: () => api.reaction.reactionByBook(bookSlug),
		select: data => data.data,
		enabled: !!bookSlug,
		networkMode: 'offlineFirst',
		gcTime: Number.MAX_SAFE_INTEGER
	})

	return {
		createReaction,
		reactionBookList
	}
}
