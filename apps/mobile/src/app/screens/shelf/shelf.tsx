import { VerticalCard } from '@/components'
import { useTypedNavigation, useTypedRoute } from '@/hooks'
import { useToggle } from '@/hooks/useToggle/useToggle'
import ShelfLayout from '@/screens/shelf/shelf-layout/shelf-layout'
import { shelfService } from '@/services/shelf/shelf-service'
import { useQuery } from '@tanstack/react-query'
import { Eye, EyeOff } from 'icons'
import { View } from 'react-native'
import {
	AnimatedIcon,
	BigLoader,
	Button,
	Description,
	Flatlist
} from 'ui/components'

const Shelf = () => {
	const { params } = useTypedRoute<'Shelf'>()
	const { data: shelf } = useQuery(['library', 'shelf', params.id], () =>
		shelfService.byId(params.id)
	)
	const {
		handleToggle: handleToggleWatchedShelves,
		isSmashed: isSmashedWatchedShelves
	} = useToggle(
		{
			type: 'shelves',
			id: params.id
		},
		['library']
	)
	const {
		handleToggle: handleToggleUnWatchedShelves,
		isSmashed: isSmashedUnwatchedShelves
	} = useToggle(
		{
			type: 'shelves',
			id: params.id
		},
		['library']
	)

	const { navigate } = useTypedNavigation()
	if (!shelf) return <BigLoader />
	return (
		<ShelfLayout title={shelf.title} backgroundImage={shelf.picture}>
			<View className='bg-dust mx-auto mt-[-40px] w-4/5 flex-row justify-between rounded-xl p-2 px-4 pb-1 pt-2'>
				<Button
					variant={isSmashedWatchedShelves ? 'secondary' : 'primary'}
					onPress={() => handleToggleWatchedShelves()}
					className='mr-1.5 flex-1'
					size='medium'
					disabled={isSmashedUnwatchedShelves}
					text={isSmashedWatchedShelves ? 'Cancel watching' : 'Start watching'}
				/>
				<AnimatedIcon
					onPress={() => handleToggleUnWatchedShelves()}
					disabled={isSmashedWatchedShelves}
					icon={isSmashedUnwatchedShelves ? EyeOff : Eye}
					className='mb-2 w-[50px]'
					size='medium'
					variant='outlined'
				/>
			</View>
			<View className='flex-row items-center justify-center gap-5 pt-4'></View>
			<View className='bg-pale mx-2 mt-4  rounded-xl p-4'>
				<Description defaultSentences={2} size={22} weight='regular'>
					{shelf.description}
				</Description>
			</View>

			<Flatlist
				data={shelf.books}
				scrollEnabled={false}
				className='mb-2 px-2'
				renderItem={({ item: book }) => (
					<VerticalCard
						image={{
							uri: book.picture,
							size: 'medium'
						}}
						title={book.title}
						description={book.author.name}
						buttons={[
							{
								label: `📖 ${book.pages} pages`
							}
						]}
						onPress={() => {
							navigate('Book', { id: book.id })
						}}
					/>
				)}
			/>
		</ShelfLayout>
	)
}

export default Shelf
