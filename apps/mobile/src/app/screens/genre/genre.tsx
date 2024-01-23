import { ScrollLayout } from '@/components'
import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import CatalogList from '@/components/lists/catalog-list/catalog-list'
import { Loader } from '@/components/ui'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { genreService } from '@/services/genre/genre-service'
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
				<Layout.Header>
					<Layout.BackWithTitle title={params.name} />
				</Layout.Header>
			),
			headerShown: true
		})
	}, [params.name, setOptions])
	return (
		<ScrollLayout>
			{genre ? (
				<CatalogList
					disabledScroll
					data={genre.majorBooks}
					onElementPress={id => navigate('Book', { id })}
				/>
			) : (
				<Loader />
			)}
		</ScrollLayout>
	)
}

export default Genre
