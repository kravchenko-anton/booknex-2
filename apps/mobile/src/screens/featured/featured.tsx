import api from '@/api'
import { useTypedNavigation } from '@/hooks'
import ManageRecommendationMenu from '@/screens/update-recommendation/manage-recommendation-menu'
import { BookCard, Flatlist, Loader, ScrollLayout } from '@/ui'
import BannerList from '@/ui/book-lists/banner-list'
import Header from '@/ui/header/header'
import { SvgButton } from '@/ui/svg-button/svg-button'
import * as Sentry from '@sentry/react-native'
import { useQuery } from '@tanstack/react-query'
import { Color } from 'global/colors'
import { QueryKeys } from 'global/utils/query-keys'
import { Search } from 'icons'
import { useEffect } from 'react'
import { RefreshControl } from 'react-native'

const Featured = () => {
	const {
		data: featured,
		refetch,
		isSuccess
	} = useQuery({
		queryKey: QueryKeys.featured,
		queryFn: () => api.catalog.featured(),
		select: data => data.data,
		staleTime: 1000 * 60 * 60 * 24
	})
	useEffect(() => {
		Sentry.metrics.increment('get-featured')
	}, [isSuccess])

	const { navigate } = useTypedNavigation()
	return (
		<>
			<Header.Head>
				<Header.Logo className='pl-2' />
				<Header.Icon
					className='pr-2'
					icon={Search}
					onPress={() => navigate('Search')}
				/>
			</Header.Head>
			{featured ? (
				<ScrollLayout
					refreshControl={
						<RefreshControl
							refreshing={false}
							colors={[Color.white]}
							progressBackgroundColor={Color.transparent}
							onRefresh={refetch}
						/>
					}>
					<BannerList
						title='Picks of the week'
						data={featured.picksOfWeek}
						renderItem={({ item: book }) => (
							<BookCard
								size='md'
								title={book.title}
								author={book.author}
								image={{
									uri: book.picture
								}}
								onPress={() => navigate('Book', { slug: book.slug })}
							/>
						)}
					/>

					<Flatlist
						horizontal
						data={featured.genres}
						renderItem={({ item: genre }) => (
							<SvgButton
								size='md'
								altEmoji={genre.emoji}
								svgUri={genre.icon}
								title={genre.name}
								onPress={() =>
									navigate('Genre', { slug: genre.slug, name: genre.name })
								}
							/>
						)}
					/>
					<BannerList
						horizontal
						mt={5}
						title='Best selling books'
						data={featured.bestSellingBooks}
						renderItem={({ item: book }) => (
							<BookCard
								size='md'
								title={book.title}
								author={book.author}
								image={{
									uri: book.picture
								}}
								onPress={() => navigate('Book', { slug: book.slug })}
							/>
						)}
					/>
					<Flatlist
						horizontal
						title='New releases'
						data={featured.newReleases}
						renderItem={({ item: book }) => (
							<BookCard
								size='md'
								image={{
									uri: book.picture
								}}
								onPress={() => navigate('Book', { slug: book.slug })}
							/>
						)}
					/>
					{featured.booksBySelectedGenres.map(list => (
						<BannerList
							key={list.length + Math.random()}
							className='mb-4'
							title='Best selling books'
							data={list}
							renderItem={({ item: book }) => (
								<BookCard
									author={book.author}
									size='md'
									image={{
										uri: book.picture
									}}
									onPress={() => navigate('Book', { slug: book.slug })}
								/>
							)}
						/>
					))}

					{
						// TODO: сделать колекцию,жанры относительно фаворитных жанров
					}
					<ManageRecommendationMenu
						onManagePress={() => navigate('UpdateRecommendation')}
					/>
				</ScrollLayout>
			) : (
				<Loader />
			)}
		</>
	)
}

export default Featured
