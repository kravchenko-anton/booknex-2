import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { Loader, ScrollLayout } from '@/ui'
import CatalogList from '@/ui/book-lists/catalog-list'
import Header from '@/ui/header/header'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from 'global/utils/query-keys'
import { useLayoutEffect } from 'react'

const Genre = () => {
	const { params } = useTypedRoute<'Genre'>()
	const { data: genre } = useQuery({
		queryKey: QueryKeys.genres.bySlug(params.slug),
		queryFn: () => api.genre.bySlug(params.slug),
		select: data => data.data
	})
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
				data={genre.books}
				onElementPress={slug => navigate('Book', { slug })}
			/>
		</ScrollLayout>
	)
}

export default Genre
