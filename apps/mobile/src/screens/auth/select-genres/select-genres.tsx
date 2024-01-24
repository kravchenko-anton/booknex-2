import { genreService } from '@/shared/api/services'
import { useTypedNavigation } from '@/shared/hooks'
import { Button, Loader, ScrollLayout, Title } from '@/shared/ui'
import { useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import type { FC } from 'react'
import { useState } from 'react'
import { View } from 'react-native'

const SelectGenres: FC = () => {
	const [selectGenres, setSelectGenres] = useState<string[]>([])
	const { data: genres } = useQuery(['genres'], () => genreService.all())
	const { navigate } = useTypedNavigation()
	if (!genres) return <Loader />
	return (
		<>
			<ScrollLayout className='p-2 py-4'>
				<View>
					<View>
						<Title size={34} weight='bold' className='mb-2' numberOfLines={2}>
							Choose your favorite genres
						</Title>
						<Title size={18} weight='light' color={Color.gray} className='mb-4'>
							Select at least 3 genres
						</Title>
					</View>
					<View className='flex w-full flex-row flex-wrap '>
						{genres.map(genre => (
							<Button
								onPress={() => {
									selectGenres.includes(genre.name)
										? setSelectGenres(
												selectGenres.filter(g => g !== genre.name)
											)
										: setSelectGenres([...selectGenres, genre.name])
								}}
								key={genre.id}
								size='md'
								variant={
									selectGenres.includes(genre.name) ? 'primary' : 'foreground'
								}
								className='mb-2 mr-2'
							>
								{genre.name}
							</Button>
						))}
					</View>
				</View>
			</ScrollLayout>
			<Button
				className='mx-2 mb-4'
				disabled={selectGenres.length < 3}
				variant='secondary'
				size='lg'
				onPress={() => {
					navigate('Registration', {
						selectGenres: selectGenres
					})
				}}
			>
				Next step
			</Button>
		</>
	)
}

export default SelectGenres
