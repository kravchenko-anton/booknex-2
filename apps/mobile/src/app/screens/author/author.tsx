import { VerticalCard } from '@/components'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import AuthorLayout from '@/screens/author/author-layout/author-layout'
import { authorService } from '@/services/author/author-service'
import { useQuery } from '@tanstack/react-query'
import { View } from 'react-native'
import { Description, Flatlist, Loader } from 'ui/components'

const Author = () => {
	const { params } = useTypedRoute<'Author'>()
	const { data: author } = useQuery(['author', params.id], () =>
		authorService.byId(params.id)
	)
	const { navigate } = useTypedNavigation()
	if (!author) return <Loader />
	return (
		<AuthorLayout
			name={author.name}
			backgroundColor="#fff"
			picture={author.picture}
		>
			<View className='bg-pale mx-2 mt-4  rounded-md p-4'>
				<Description size={22} className='w-full' weight='regular'>
					{author.description}
				</Description>
			</View>

			<Flatlist
				data={author.books}
				scrollEnabled={false}
				className='mb-2 px-2'
				renderItem={({ item: book }) => (
					<VerticalCard
						image={{
							uri: book.picture,
							size: 'md'
						}}
						title={book.title}
						onPress={() => {
							navigate('Book', { id: book.id })
						}}
					/>
				)}
			/>
		</AuthorLayout>
	)
}

export default Author
