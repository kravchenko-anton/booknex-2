import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { Loader, ScrollLayout } from '@/ui'
import CatalogList from '@/ui/book-lists/catalog-list'
import Header from '@/ui/header/header'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'

const Genre = () => {
	const { params } = useTypedRoute<'Genre'>()
	const { data: genre } = useQuery({
		queryKey: QueryKeys.genres.bySlug(params.slug),
		queryFn: () => api.genre.bySlug(params.slug),
		select: data => data.data
	})
	const { navigate } = useTypedNavigation()
	return (
		<>
			<Header.Head>
				<Header.BackWithTitle title={params.name} />
			</Header.Head>

			{genre ? (
				<ScrollLayout>
					<CatalogList
						disabledScroll
						data={genre.books}
						onElementPress={slug => navigate('Book', { slug })}
					/>
				</ScrollLayout>
			) : (
				<Loader />
			)}
		</>
	)
}

export default Genre
