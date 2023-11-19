import Layout from '@/components/layout/layout'
import FullScreenLoader from '@/components/ui/loader/big-loader'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import EnterField from '@/screens/auth/register/enter-field/enter-field'
import SelectGenres from '@/screens/auth/register/select-genres/select-genres'
import { genreService } from '@/services/genre-service'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const Register = () => {
	const {
		params: { defaultEmail }
	} = useTypedRoute<'Registration'>()
	const { data: genres } = useQuery(['genres'], () => genreService.getGenres())
	const [selectGenres, setSelectGenres] = useState<string[]>([])
	const [activePopup, setIsActivePopup] = useState<'genres' | 'fields'>(
		'genres'
	)
	if (!genres) return <FullScreenLoader />
	return (
		<Layout className='h-full'>
			<EnterField
				isActivePopup={activePopup === 'fields'}
				defaultEmail={defaultEmail}
				selectGenres={selectGenres}
				setIsActivePopup={setIsActivePopup}
			/>
			<SelectGenres
				selectGenres={selectGenres}
				genres={genres}
				setSelectGenres={setSelectGenres}
				isActivePopup={activePopup === 'genres'}
				setIsActivePopup={setIsActivePopup}
			/>
		</Layout>
	)
}

export default Register
