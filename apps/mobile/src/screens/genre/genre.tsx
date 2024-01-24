import { genreService } from '@/shared/api/services'
import { useTypedNavigation, useTypedRoute } from '@/shared/hooks'
import { Loader, ScrollLayout } from '@/shared/ui'
import CatalogList from '@/shared/ui/book-lists/catalog-list'
import Header from '@/shared/ui/header/header'
import { useQuery } from '@tanstack/react-query'
import { useLayoutEffect } from 'react'

const Genre = () => {
	const { params } = useTypedRoute<'Genre'>()
	const { data: genre } = useQuery(['genre', params.id], () =>
		genreService.byId(+params.id)
	)
	const { setOptions, navigate } = useTypedNavigation()
	useLayoutEffect(() => {
		setOptions({
			header: () => (
				<Header.Head>
					<Header.BackWithTitle title={params.name} />
				</Header.Head>
			),
			headerShown: true
		})
	}, [params.name, setOptions])
	if (!genre) return <Loader />
	return (
		<ScrollLayout>
			<CatalogList
				disabledScroll
				data={genre.majorBooks}
				onElementPress={id => navigate('Book', { id })}
			/>
		</ScrollLayout>
	)
}

export default Genre
