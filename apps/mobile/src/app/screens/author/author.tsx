import { BookCard, Header } from '@/components'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { authorService } from '@/services/author/author-service'
import { useQuery } from '@tanstack/react-query'
import { StatusBar, View } from 'react-native'
import { Color } from 'ui/colors'
import {
	Description,
	Flatlist,
	Image,
	Loader,
	ScrollView,
	Title
} from 'ui/components'

const Author = () => {
	const { params } = useTypedRoute<'Author'>()
	const { data: author } = useQuery(['author', params.id], () =>
		authorService.byId(params.id)
	)
	const { navigate } = useTypedNavigation()
	//TODO: сделать компонент Header где через chindlen буду прокидывать

	if (!author) return <Loader />
	return (
		<ScrollView>
			<StatusBar backgroundColor={Color.foreground} />
			<View
				style={{
					backgroundColor: Color.foreground
				}}
				className='h-[250px] rounded-b-3xl'
			>
				<View className='flex-1 p-4 pt-0'>
					иконку
					<Header
						color={Color.white}
						right={{
							sharing: `${author.name} is a great author! Check him on Booknex!`
						}}
					/>
					<Image
						url={author.picture}
						className='mb-4 mt-2 self-center'
						height={100}
						width={100}
					/>
					<Title
						size={26}
						color={Color.white}
						center={true}
						weight='bold'
						numberOfLines={2}
					>
						{author.name}
					</Title>
				</View>
			</View>
			<View className='px-4'>
				<Description size={22} className='mt-4 w-full' weight='regular'>
					{author.description}
				</Description>

				<Flatlist
					title={{
						text: 'Books'
					}}
					data={author.books}
					scrollEnabled={false}
					className='mb-2'
					renderItem={({ item: book }) => (
						<BookCard
							size='md'
							image={{
								uri: book.picture
							}}
							title={book.title}
							onPress={() => {
								navigate('Book', { id: book.id })
							}}
						/>
					)}
				/>
			</View>
		</ScrollView>
	)
}

export default Author
