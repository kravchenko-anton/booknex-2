import Header from '@/components/header/header'
import Button from '@/components/ui/button/button'
import { Title } from '@/components/ui/title/title'
import { popupAnimation } from '@/screens/auth/welcome/popup-animation'
import type { GenreType } from '@/services/types/genre-service-types'
import { AnimatedView } from '@/types/component-types'
import type { PopupTypes } from '@/types/global'
import { Color } from '@/utils/color'
import type { Dispatch, FC, SetStateAction } from 'react'
import { View } from 'react-native'

export interface SelectGenresProperties
	extends PopupTypes<'genres' | 'fields'> {
	genres: GenreType[]
	selectGenres: string[]
	setSelectGenres: Dispatch<SetStateAction<string[]>>
}

const SelectGenres: FC<SelectGenresProperties> = ({
	genres,
	isActivePopup,
	setSelectGenres,
	selectGenres,
	setIsActivePopup
}) => {
	const { showAnimation } = popupAnimation(isActivePopup)
	return (
		<AnimatedView style={showAnimation} className='h-full'>
			<Header />
			<View>
				<Title size={34} weight={'bold'} className='mb-2' numberOfLines={2}>
					Choose your favorite genres
				</Title>
				<Title size={18} weight={'light'} color={Color.gray} className='mb-4'>
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
						size={'medium'}
						text={genre.name}
						variant={selectGenres.includes(genre.name) ? 'primary' : 'dust'}
						className='mr-3'
					/>
				))}
			</View>
			<Button
				className='mt-auto'
				disabled={selectGenres.length < 3}
				variant={'secondary'}
				size={'large'}
				text={'Next step'}
				onPress={() => {
					setIsActivePopup('fields')
				}}
			/>
		</AnimatedView>
	)
}

export default SelectGenres
