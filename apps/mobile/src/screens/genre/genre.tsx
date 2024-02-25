import api from '@/api'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { Loader, ScrollLayout } from '@/ui'
import CatalogList from '@/ui/book-lists/catalog-list'
import Header from '@/ui/header/header'
import { useQuery } from '@tanstack/react-query'
import { useLayoutEffect } from 'react'

const Genre = () => {
	const { params } = useTypedRoute<'Genre'>()
	const { data: genre } = useQuery({
		queryKey: ['genre', +params.id],
		queryFn: () => api.genre.byId(+params.id),
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
				data={genre.majorBooks}
				onElementPress={id => navigate('Book', { id })}
			/>
		</ScrollLayout>
	)
}

export default Genre
