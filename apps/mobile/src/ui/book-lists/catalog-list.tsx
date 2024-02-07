import { AnimatedPress, Flatlist, Image, Title } from '@/ui'
import { settings } from '@/ui/book-card/settings'
import { Color } from 'global/colors'

const CatalogList = ({
	data,
	disabledScroll = false,
	onElementPress = () => {}
}: {
	disabledScroll?: boolean
	data: {
		id: number
		title: string
		picture: string
	}[]
	onElementPress?: (id: number) => void
}) => (
	<Flatlist
		scrollEnabled={!disabledScroll}
		mt={10}
		className='w-full px-4'
		numColumns={2}
		data={data}
		ListEmptyComponent={() => (
			<Title className='mx-auto' size={16} color={Color.gray} weight='medium'>
				Nothing here
			</Title>
		)}
		columnWrapperStyle={{
			justifyContent: 'space-between'
		}}
		renderItem={({ item: book }) => (
			<AnimatedPress
				className='mb-4 w-[48%]'
				onPress={() => onElementPress(book.id)}
			>
				<Image
					className='mb-1 w-full'
					height={settings.height.md * 1.1}
					url={book.picture}
				/>
				<Title color={Color.gray} size={16} weight='semiBold'>
					{book.title}
				</Title>
			</AnimatedPress>
		)}
	/>
)

export default CatalogList
