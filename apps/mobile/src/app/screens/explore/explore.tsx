import { BookCard, RainbowBookCard } from '@/components'
import Layout from '@/components/layout/header-scroll-layout/header-scroll-layout'
import { Flatlist, Loader } from '@/components/ui'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import SearchField from '@/screens/explore/search-field'
import { catalogService } from '@/services/catalog/catalog-service'
import { useQuery } from '@tanstack/react-query'
//TODO: переделать поиск под headway

const Explore = () => {
	const { data: explore } = useQuery(['explore'], () =>
		catalogService.explore()
	)
	const { navigate } = useTypedNavigation()
	if (!explore) return <Loader />
	return (
		<Layout.Wrapper
			contentContainerStyle={{
				marginTop: 10
			}}
			header={
				<Layout.Header>
					<Layout.BackWithTitle title='Explore' />
				</Layout.Header>
			}
		>
			<SearchField />
			<Flatlist
				title='Best Sellers'
				horizontal
				data={explore.bestSellers}
				renderItem={({ item: book }) => (
					<BookCard
						onPress={() => navigate('Book', { id: book.id })}
						size='lg'
						image={{ uri: book.picture }}
						author={book.author.name}
					/>
				)}
			/>
			<Flatlist
				horizontal
				mt={20}
				title='Popular Now'
				data={explore.popularNow}
				renderItem={({ item: book }) => (
					<RainbowBookCard
						onPress={() => navigate('Book', { id: book.id })}
						backgroundColor={book.color}
						image={{ uri: book.picture }}
						title={book.title}
						description={book.description}
					/>
				)}
			/>
			<Flatlist
				title='New Releases'
				horizontal
				data={explore.newReleases}
				renderItem={({ item: book }) => (
					<BookCard
						size='md'
						onPress={() => navigate('Book', { id: book.id })}
						image={{ uri: book.picture }}
					/>
				)}
			/>
		</Layout.Wrapper>
	)
}

export default Explore
