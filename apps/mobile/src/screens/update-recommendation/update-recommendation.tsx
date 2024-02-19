import { genreService } from '@/api/services'
import { userServices } from '@/api/services/user/user-service'
import { useTypedNavigation } from '@/hooks'
import { Button, Icon, Loader, ScrollLayout, Title } from '@/ui'
import { cn } from '@/utils'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { UserUpdateSelectedGenresDto } from 'backend/src/user/dto'
import { Color } from 'global/colors'
import { Close } from 'icons'
import { useState } from 'react'
import { View } from 'react-native'

const UpdateRecommendation = () => {
	const [selectedGenres, setSelectedGenres] = useState<number[]>([])
	const { data: genres } = useQuery({
		queryKey: ['genres'],
		queryFn: () => genreService.all()
	})

	const { mutateAsync: update, isLoading } = useMutation({
		mutationKey: ['update-recommendation'],
		mutationFn: (dto: UserUpdateSelectedGenresDto) =>
			userServices.updateRecommendations(dto)
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
					<Title size={32} weight='bold' className='mb-2' numberOfLines={2}>
						What you next goal?
					</Title>
					<Title
						size={18}
						numberOfLines={2}
						weight='light'
						color={Color.gray}
						className='mb-4'
					>
						Select 3 genres for better recommendations
					</Title>
				</View>
				<View className='flex w-full flex-row flex-wrap'>
					{genres.map(genre => (
						<Button
							key={genre.id}
							size='md'
							className='mb-2.5 mr-2.5'
							variant={
								selectedGenres.includes(genre.id) ? 'primary' : 'foreground'
							}
							onPress={() => {
								selectedGenres.includes(genre.id)
									? setSelectedGenres(
											selectedGenres.filter(g => g !== genre.id)
										)
									: selectedGenres.length < 3 &&
										setSelectedGenres([...selectedGenres, genre.id])
							}}
						>
							{genre.name}
						</Button>
					))}
				</View>
			</ScrollLayout>
			<Button
				disabled={selectedGenres.length !== 3}
				variant='primary'
				isLoading={isLoading}
				size='lg'
				className={cn('mx-2 mb-4', selectedGenres.length === 0 && 'hidden')}
				onPress={async () => {
					await update({ selectedGenres })
					navigate('Featured')
				}}
			>
				Save
			</Button>
		</>
	)
}

export default UpdateRecommendation
