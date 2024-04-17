import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import { Button, Icon, Loader, ScrollLayout, Title } from '@/ui'
import { cn } from '@/utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { UpdateRecommendationDto } from 'global/api-client'

import { Color } from 'global/colors'
import { MutationKeys, QueryKeys } from 'global/utils/query-keys'
import { Close } from 'icons'
import { useState } from 'react'
import { View } from 'react-native'

const UpdateRecommendation = () => {
	const queryClient = useQueryClient()
	const [selectedGenres, setSelectedGenres] = useState<string[]>([])
	const { data: genres } = useQuery({
		queryKey: QueryKeys.genres.key,
		queryFn: () => api.genre.catalog(),
		select: data => data.data
	})

	const { mutateAsync: update, isLoading: updateLoading } = useMutation({
		mutationKey: MutationKeys.recommendation.update,
		mutationFn: (dto: UpdateRecommendationDto) =>
			api.recommendation.updateRecommendation(dto),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: QueryKeys.recommendationGenres
			})
		}
	})
	const { navigate } = useTypedNavigation()
	if (!genres) return <Loader />
	return (
		<>
			<ScrollLayout className='p-2 py-4'>
				<Icon
					variant='transparent'
					className='ml-auto'
					icon={Close}
					size='md'
					onPress={() => navigate('Featured')}
				/>
				<View>
					<Title size={'xxl'} weight='bold' className='mb-2' numberOfLines={2}>
						What you next goal?
					</Title>
					<Title
						size={'lg'}
						numberOfLines={2}
						weight='light'
						color={Color.gray}
						className='mb-4'>
						Select 3 genres for better recommendations
					</Title>
				</View>
				<View className='flex w-full flex-row flex-wrap'>
					{genres.map(genre => (
						<Button
							key={genre.slug}
							size='md'
							className='mb-2.5 mr-2.5'
							variant={
								selectedGenres.includes(genre.slug) ? 'primary' : 'muted'
							}
							onPress={() => {
								selectedGenres.includes(genre.slug)
									? setSelectedGenres(
											selectedGenres.filter(g => g !== genre.slug)
										)
									: selectedGenres.length < 3 &&
										setSelectedGenres([...selectedGenres, genre.slug])
							}}>
							{genre.name}
						</Button>
					))}
				</View>
			</ScrollLayout>
			<Button
				disabled={selectedGenres.length !== 3}
				variant='primary'
				isLoading={updateLoading}
				size='lg'
				className={cn('mx-2 mb-4', selectedGenres.length === 0 && 'hidden')}
				onPress={async () => {
					console.log({ selectedGenres })
					await update({ genreSlugs: selectedGenres })

					await queryClient.invalidateQueries({
						queryKey: QueryKeys.featured
					})
					navigate('Featured')
				}}>
				Save
			</Button>
		</>
	)
}

export default UpdateRecommendation
