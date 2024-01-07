import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'

import { useTypedNavigation } from '@/hooks'
import { genreService } from '@/services/genre/genre-service'
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'
import { useState } from 'react'
import { View } from 'react-native'
import { Color } from 'ui/colors'
import { Button, Loader, Title } from 'ui/components'

const SelectGenres: FC = () => {
	const [selectGenres, setSelectGenres] = useState<string[]>([])
	const { data: genres } = useQuery(['genres'], () => genreService.all())
	const { navigate } = useTypedNavigation()
	if (!genres) return <Loader />
	return (
		<Layout.Wrapper
			className='h-full p-2 py-4'
			contentContainerStyle={{
				justifyContent: 'space-between',
				height: '100%'
			}}
			header={
				<Layout.Header>
					<Layout.BackWithTitle title='Sign up' />
				</Layout.Header>
			}
		>
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
									? setSelectGenres(selectGenres.filter(g => g !== genre.name))
									: setSelectGenres([...selectGenres, genre.name])
							}}
							key={genre.id}
							size='md'
							variant={
								selectGenres.includes(genre.name) ? 'primary' : 'foreground'
							}
							className='mb-2 mr-3'
						>
							{genre.name}
						</Button>
					))}
				</View>
			</View>
			<Button
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
		</Layout.Wrapper>
	)
}

export default SelectGenres
