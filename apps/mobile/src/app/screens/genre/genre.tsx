import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import CatalogList from '@/components/lists/catalog-list/catalog-list'
import { Loader } from '@/components/ui'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { genreService } from '@/services/genre/genre-service'
import { useQuery } from '@tanstack/react-query'

const Genre = () => {
	const { params } = useTypedRoute<'Genre'>()
	const { data: genre } = useQuery(['genre', params.id], () =>
		genreService.byId(+params.id)
	)
	const { navigate } = useTypedNavigation()
	return (
		<Layout.Wrapper
			header={
				<Layout.Header>
					<Layout.BackWithTitle title={params.name} />
				</Layout.Header>
			}
		>
			{genre ? (
				<CatalogList
					disabledScroll
					data={genre.majorBooks}
					onElementPress={id => navigate('Book', { id })}
				/>
			) : (
				<Loader />
			)}
		</Layout.Wrapper>
	)
}

export default Genre
