import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { genreService } from '@/services/genre/genre-service'
import { useQuery } from '@tanstack/react-query'

export const useGenre = () => {
	const { params } = useTypedRoute<'Genre'>()
	const { data: genre } = useQuery(['genre', params.id], () =>
		genreService.byId(+params.id)
	)
	const { navigate: navigateFunction } = useTypedNavigation()
	const navigate = {
		book: (id: number) => {
			navigateFunction('Book', { id })
		},
		author: (id: number) => {
			navigateFunction('Author', { id })
		}
	}

	return {
		genre,
		navigate
	}
}
